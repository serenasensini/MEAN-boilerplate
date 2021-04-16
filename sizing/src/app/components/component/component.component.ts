import { Component, OnInit, ViewChild} from '@angular/core';
import {ComponentData, ComponentsService} from '../../services/components.service';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit  {
  displayedColumns: string[] = ['name', 'description', 'detail'];
  dataSource: MatTableDataSource<ComponentData>;
  components: ComponentData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public componentsService: ComponentsService) {
  }

  ngOnInit(): void {
    this.componentsService.getComponents()
      .subscribe((components: ComponentData[]) => {
        // @ts-ignore
        console.log(components.data);
        // @ts-ignore
        this.components = components.data;
        this.dataSource = new MatTableDataSource(this.components);
        this.dataSource.sort = this.sort;
      });
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}


