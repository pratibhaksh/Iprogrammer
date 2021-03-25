import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  getAllImageInfo;
  getAllImageInfoMoveData = [];
  array = [];
  sum = 100;
  direction = '';
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  constructor(private CommonService: CommonService) { }
  MoveToTable(item) {
    item.isselected = true;
    this.getAllImageInfoMoveData.push(item);
  }

  onScroll() {
    console.log('scrolled!!');
  }
  RemoveToTable(item) {
    item.isselected = false;
    let index = this.getAllImageInfoMoveData.findIndex(rank => rank.id === item.id);
    this.getAllImageInfoMoveData.splice(index, 1);
  }
  ngOnInit(): void {
    this.getImage();

  }

  getImage() {
    this.CommonService.getData().subscribe((response: any) => {
      this.getAllImageInfo = response;
      this.getAllImageInfo.forEach(element => {
        element.isselected = false;
      });
      this.appendItems(0, this.sum);
    })


  }

  addItems(startIndex, endIndex, _method) {
    for (let i = 0; i < this.sum; ++i) {
      this.array[_method](this.getAllImageInfo[i]);
    }
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "push");
  }

  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, "unshift");
  }

  onScrollDown(ev) {
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);

    this.direction = "down";
  }

  onUp(ev) {
    console.log("scrolled up!", ev);
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);

    this.direction = "up";
  }
}
