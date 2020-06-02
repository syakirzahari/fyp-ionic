import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Appointment } from '../../models/appointment';

@Injectable()

export class AppointmentService {

    private appointmentRef = this.afDatabase.list<Appointment>('appointment');
    private appointmentRef1 = this.afDatabase.list<Appointment>('accepted');
    private appointmentRef2 = this.afDatabase.list<Appointment>('history');


    constructor(private afDatabase: AngularFireDatabase) {}

    getAppointmentList(){
        return this.appointmentRef;
    }

    getAppointmentList1(){
        return this.appointmentRef1;
    }

    getAppointmentList2(){
        return this.appointmentRef2;
    }

    addItem(appointment: Appointment){
        return this.appointmentRef.push(appointment);
    }

    addItem1(appointment: Appointment){
        return this.appointmentRef1.push(appointment);
    }

    addItem2(appointment: Appointment){
        return this.appointmentRef2.push(appointment);
    }

    editItem(appointment: Appointment){
        return this.appointmentRef.update(appointment.key, appointment);    
    }

    removeItem(appointment: Appointment){
        return this.appointmentRef.remove(appointment.key);
    }

    removeItem1(appointment: Appointment){
        return this.appointmentRef1.remove(appointment.key);
    }


}