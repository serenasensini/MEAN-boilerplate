import {Component, OnInit, ViewChild} from '@angular/core';
import {SizingData, SizingService} from '../../services/sizing.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-sizing',
  templateUrl: './sizing.component.html',
  styleUrls: ['./sizing.component.css']
})
export class SizingComponent implements OnInit {

  displayedColumns: string[] = ['name', 'detail'];
  dataSource: MatTableDataSource<SizingData>;
  sizings: SizingData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public sizingService: SizingService) {
  }

  ngOnInit(): void {
    this.sizingService.getSizings()
      .subscribe((sizings: SizingData[]) => {
        // @ts-ignore
        console.log(sizings.data);
        // @ts-ignore
        this.sizings = sizings.data;
        this.dataSource = new MatTableDataSource(this.sizings);
        this.dataSource.sort = this.sort;
      });
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
