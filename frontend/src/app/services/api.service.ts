// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { tap,catchError } from 'rxjs/operators';
import { of,throwError } from 'rxjs';

export interface NotificationResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})



export class ApiService {
  private API_URL = environment.apiUrl;
  private AUTH_KEY = 'token';

  constructor(private http: HttpClient) {
    console.log('API Service Initialized with API_URL:', this.API_URL);
    this.checkBackendConnection();
  }

  
  // ------------------ Auth Services ------------------


  signup(userData: any): Observable<any> {
    console.log('Signup request with data:', userData);
    return this.http.post(`${this.API_URL}/api/auth/register`, userData, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Signup error:', error);
          return throwError(() => error);
        })
      );
  }



  login(email: string, password: string): Observable<any> {
    console.log('Login attempt for email:', email);
    return this.http.post(`${this.API_URL}/api/auth/login`, { email, password }, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  storeUserData(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/auth/me`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Get current user error:', error);
          return throwError(() => error);
        })
      );
  }

  sendNotification(data: any) : Observable<NotificationResponse> {
    const token = localStorage.getItem('token');
  if (!token) {
    return throwError(() => new Error('No authentication token found'));
  }
  return this.http.post<NotificationResponse>(
    '${this.API_URL}/api/notifications/send',
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      }
    }
  );
}

getUserNotifications() {
    return this.http.get<any[]>(`${this.API_URL}/api/notifications/my`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    });
  }

  markAllNotificationsAsRead() {
  return this.http.put(`${this.API_URL}/api/notifications/mark-all-read`, {}); // Adjust URL as needed
}


  

  // ------------------ Header & Token Helpers ------------------

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

   private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const token = this.getToken();
    if (token) headers = headers.set('Authorization',`Bearer ${token}`);
    return headers;
  }

  // ------------------ Backend Health ------------------

  checkBackendConnection(): void {
    const url = `${this.API_URL}/api/health`;
    this.http.get(url, { headers: this.getHeaders() }).subscribe({
      next: res => console.log('✅ Backend connected:', res),
      error: err => console.error('❌ Backend connection failed:', err)
    });
  }

  // ------------------ User Services ------------------

  getUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/users`, { headers: this.getHeaders() });
  }

  // ------------------ Patient Services ------------------

  getAllPatients(page = 1, limit = 10, search = '', status = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    // 🟣 Add search parameter if provided
    if (search) {
      params = params.set('search', search);
    }
    
    // 🟣 Add status filter if provided
    if (status) {
      params = params.set('status', status);
    }

    // 🟣 Updated to use the correct endpoint that matches backend controller
    return this.http.get(`${this.API_URL}/api/patients`, {
      headers: this.getHeaders(),
      params: params
    }).pipe(
      catchError(error => {
        console.error('Error fetching patients:', error);
        return throwError(() => error);
      })
    );
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/patients/patient/${id}`, { headers: this.getHeaders() });
  }

  createPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/records`, patientData, { headers: this.getHeaders() });
  }

  updatePatient(id: string, patientData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/records/${id}`, patientData, { headers: this.getHeaders() });
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/records/${id}`, { headers: this.getHeaders() });
  }

  // ------------------ Medical Record Services ------------------

  getAllRecords(params?: any): Observable<any> {
    return this.http.get(`${this.API_URL}/records`, { headers: this.getHeaders(), params });
  }

  getRecordById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/records/${id}`, { headers: this.getHeaders() });
  }

  getPatientRecords(patientId: string, params?: any): Observable<any> {
    return this.http.get(`${this.API_URL}/patients/${patientId}/records`, {
      headers: this.getHeaders(),
      params
    });
  }

  createRecord(recordData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/records`, recordData, { headers: this.getHeaders() });
  }

  updateRecord(id: string, recordData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/records/${id}`, recordData, { headers: this.getHeaders() });
  }

  deleteRecord(recordId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${this.API_URL}/api/records/${recordId}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }
  getAccessLogs(recordId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/records/${recordId}/access-logs`, { headers: this.getHeaders() });
  }

  // ------------------ Dashboard ------------------

  getSummaryStats(): Observable<any> {
    return this.http.get(`${this.API_URL}/dashboard/stats`, { headers: this.getHeaders() });
  }

  getRecentActivity(): Observable<any> {
    return this.http.get(`${this.API_URL}/dashboard/activity`, { headers: this.getHeaders() });
  }

  getSettings(): Observable<any> { // ✅ Added for settings
    return this.http.get(`${this.API_URL}/api/settings`, { headers: this.getHeaders() }) // ✅ Added for settings
      .pipe(
        catchError(error => {
          console.error('Get settings error:', error);
          return throwError(() => error);
        })
      );
  }

  saveSettings(settingsData: any): Observable<any> { // ✅ Added for settings
    return this.http.post(`${this.API_URL}/api/settings`, settingsData, { headers: this.getHeaders() }) // ✅ Added for settings
      .pipe(
        catchError(error => {
          console.error('Save settings error:', error);
          return throwError(() => error);
        })
      );
  }
  
  submitSupportTicket(ticketData: any): Observable<any> {
    // FIXED: Use baseUrl instead of hardcoded URL and ensure headers are set correctly
    return this.http.post(`${this.API_URL}/api/support/submit`, ticketData, {
      headers: this.getHeaders()
    }).pipe(
      catchError(error => {
        console.error('Support ticket submission error:', error);
        return throwError(() => error);
      })
    );
  }
   // Get Available Time Slots
  // In api.service.ts
getAvailableSlots(params: any): Observable<any> {
  // ✅ Fix URL and add proper params
  const url = `${this.API_URL}/api/appointments/slots`;
  
  // ✅ Debug the request
  console.log('Requesting available slots with params:', params);
  
  let httpParams = new HttpParams();
  
  // Add parameters correctly
  if (params.doctorId) {
    httpParams = httpParams.set('doctorId', params.doctorId);
  }
  
  if (params.date) {
    httpParams = httpParams.set('date', params.date);
  }
  
  return this.http.get(url, { 
    headers: this.getHeaders(),
    params: httpParams
  }).pipe(
    catchError(error => {
      console.error('Error fetching available slots:', error);
      // Return a default response as fallback for development
      if (error.status === 404 || error.status === 0) {
        console.log('Returning mock time slots due to API error');
        return of({
          availableSlots: [
            '09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM',
            '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM'
          ]
        });
      }
      return throwError(() => error);
    })
  );
}

  // Get Doctors List
  getDoctors(): Observable<any> {
    const url = `${this.API_URL}/api/appointments/doctors`;
    return this.http.get(url, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching doctors:', error);
          return throwError(() => error);
        })
      );
  }

  // Get Appointments for a Patient
  getPatientAppointments(): Observable<any> {
    const url = `${this.API_URL}/api/appointments/patient`;
    return this.http.get<{ past: any[], upcoming: any[] }>(url, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching patient appointments:', error);
          return throwError(() => error);
        })
      );
  }

  getDoctorAppointments(): Observable<{ past: any[], upcoming: any[] }> {
  const url = `${this.API_URL}/api/appointments/doctor-appointments`;
  return this.http.get<{ past: any[], upcoming: any[] }>(url, { headers: this.getHeaders() })
    .pipe(
      catchError(error => {
        console.error('Error fetching doctor appointments:', error);
        return throwError(() => error);
      })
    );
}

changePassword(passwordData: any): Observable<any> {
  return this.http.post(`${this.API_URL}/api/auth/change-password`, passwordData, {
    headers: this.getHeaders()
  }).pipe(
    catchError(error => {
      console.error('Change password error:', error);
      return throwError(() => error);
    })
  );
}

updateUser(id: string, userData: any): Observable<any> {
  return this.http.put(`${this.API_URL}/api/auth/users/${id}`, userData, { 
    headers: this.getHeaders() 
  }).pipe(
    catchError(error => {
      console.error('Update user error:', error);
      return throwError(() => error);
    })
  );
}

uploadRecord(recordData: any): Observable<any> {
  const token = localStorage.getItem('token'); // or sessionStorage if you're using that

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  console.log('🔄 Sending record data to API with token:', recordData);

  return this.http.post(`${this.API_URL}/api/records`, recordData, { headers })
    .pipe(
      tap(response => console.log('✅ Upload record response:', response)),
      catchError(error => {
        console.error('❌ Upload record error:', error);
        return throwError(() => error);
      })
    );
}


  getRecordsByPatient(patientId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.API_URL}/api/records/${patientId}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  

  bookAppointment(appointmentData: any): Observable<any> {
  const url = `${this.API_URL}/api/appointments/book`;
  return this.http.post(url, appointmentData, { headers: this.getHeaders() }).pipe(
    catchError(error => {
      console.error('Error booking appointment:', error);
      return throwError(() => error);
    })
  );
}



























}


