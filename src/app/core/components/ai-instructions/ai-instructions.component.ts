import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ai-instructions',
  templateUrl: './ai-instructions.component.html',
  styleUrls: ['./ai-instructions.component.scss'],
})
export class AiInstructionsComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
}
