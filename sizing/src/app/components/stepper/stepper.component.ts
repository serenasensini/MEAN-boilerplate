import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ComponentData, ComponentsService} from '../../services/components.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatRipple} from '@angular/material/core';
import {RequestData, RequestsService} from '../../services/requests.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class StepperComponent implements OnInit {

  @ViewChild(MatRipple) ripple: MatRipple;
  @ViewChild('content', {static: false}) content: ElementRef;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  scopes;

  // available applications
  applications;
  // check if application has been choosen
  isSelected = false;
  // available sizing for this application
  // tslint:disable-next-line:variable-name
  available_sizings;

  components = [];
  tmpComponentSizing;

  request;
  requestInfo: MatTableDataSource<RequestData>;

  displayedColumns: string[] = ['tot_CPU', 'tot_RAM', 'worker_nodes', 'master_nodes'];

  report = false;

  durationInSeconds = 5;

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, public componentsService: ComponentsService, public requestsService: RequestsService,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.componentsService.getComponents()
      .subscribe((components: ComponentData[]) => {
        // @ts-ignore
        console.log(components.data);
        // @ts-ignore
        this.applications = components.data;
      });


    this.firstFormGroup = this._formBuilder.group({
      owner: ['', Validators.required],
      customer: ['', Validators.required],
      scopeControl: ['']
    });

    this.scopes = [
      {name: 'Offer', sound: 'Offer'},
      {name: 'Sale', sound: 'Sale'},
      {name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!'},
    ];

    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      high_availability: [false],
      monitoring: [false],
      environment: ['', Validators.required],
      logging: [false],
      database_type: ['']
    });

    this.thirdFormGroup = this._formBuilder.group({
      component: [],
    });

  }

  // tslint:disable-next-line:typedef
  getSizings(){
    for (const app of this.applications){
      if (this.thirdFormGroup.get('component').value === app.name) {
        this.available_sizings = app.available_sizing;
        console.log(this.available_sizings);
        this.isSelected = true;
      }
    }
  }

  // tslint:disable-next-line:typedef
  addComponent(){
    // TODO: quando aggiungo un componente, nel toggle le altre size spariscono
    let component;

    const chosenComponentName = this.thirdFormGroup.get('component').value;

    // avoid duplicates
    this.components = this.components.filter(obj => {
      return obj.name !== chosenComponentName;
    });

    console.log(this.components);

    for (const app of this.applications){
      if (app.name === chosenComponentName){
        component = Object.assign({}, app);
        // component = app;
        // remove useless sizings
        component.available_sizing = [];
        component.available_sizing.push(this.tmpComponentSizing);

        this.components.push(component);
        break;
      }
    }
    console.log(this.applications);
    console.log(this.components);
  }

  // tslint:disable-next-line:typedef
  setSizing(size){
    for (const s of this.available_sizings){
      s.selected = undefined;
    }
    this.tmpComponentSizing = size;
    size.selected = true;
    console.log(size);
  }

  // tslint:disable-next-line:typedef
  reset(){
    this.components = [];
    for (const s of this.available_sizings){
      s.selected = undefined;
    }
  }

  // tslint:disable-next-line:typedef
  getReport() {

    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      this._snackBar.open('Check the previous errors.', '', {
        duration: 2000,
      });
      return;
    } else {
      let body;
      body = {
        name: this.secondFormGroup.get('name').value,
        // description: this.secondFormGroup.get('description').value,
        owner: this.firstFormGroup.get('owner').value,
        customer: this.firstFormGroup.get('customer').value,
        scope: this.firstFormGroup.get('scopeControl').value,
        high_availability: this.secondFormGroup.get('high_availability').value,
        monitoring: this.secondFormGroup.get('monitoring').value,
        environment: this.secondFormGroup.get('environment').value,
        logging: this.secondFormGroup.get('logging').value,
        database_type: this.secondFormGroup.get('database_type').value,
        components: this.components
      };
      this.requestsService.calculateReport(body)
        .subscribe(requests =>
          {
            // @ts-ignore
            this.request = requests.data;
            console.log(this.request);
            this.requestInfo = new MatTableDataSource(this.request.results);
            console.log(this.request.results);
            this.report = true;
          }
        );
    }

  }

}
