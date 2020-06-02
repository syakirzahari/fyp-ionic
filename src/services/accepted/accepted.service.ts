import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Accepted } from '../../models/accepted';
import { Appointment } from '../../models/appointment';


@Injectable()

export class AcceptedService {

    private appointmentRef = this.afDatabase.list<Accepted>('accepted');
    private appointmentRef1 = this.afDatabase.list<Accepted>('history');


    constructor(private afDatabase: AngularFireDatabase) {}

    getAppointmentList(){
        return this.appointmentRef;
    }

    getAppointmentList1(){
        return this.appointmentRef1;
    }

    addItem(accepted: Accepted){
        return this.appointmentRef1.push(accepted);
    }

    removeItem(accepted: Accepted){
        return this.appointmentRef.remove(accepted.key);
    }

    removeItem1(appointment: Appointment){
        return this.appointmentRef.remove(appointment.key);
    }


}