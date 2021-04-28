import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {RequestData, RequestsService} from '../../services/requests.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description'];
  dataSource: MatTableDataSource<RequestData>;
  requests: RequestData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  // STEP 4: import servizio per la gestione delle richieste
  constructor(public requestsService: RequestsService) {
  }


  // STEP 5: recupero richieste e popolamento datasource della tabella
  ngOnInit(): void {
    this.requestsService.getRequests()
      .subscribe((requests: RequestData[]) => {
        // @ts-ignore
        console.log(requests.data);
        // @ts-ignore
        this.requests = requests.data;
        this.dataSource = new MatTableDataSource(this.requests);
        this.dataSource.sort = this.sort;
      });
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
