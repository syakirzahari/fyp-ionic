import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Request } from '../../models/request';


@Injectable()

export class RequestService {

    private requestRef = this.afDatabase.list<Request>('request');


    constructor(private afDatabase: AngularFireDatabase) {}

    getRequestList(){
        return this.requestRef;
    }

    addItem(request: Request){
        return this.requestRef.push(request);
    }



}