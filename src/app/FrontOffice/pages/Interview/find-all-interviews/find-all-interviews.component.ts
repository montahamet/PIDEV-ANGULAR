import { Component } from '@angular/core';
import { Interview } from 'src/app/Models/interview';
import { StatusInterview } from 'src/app/Models/status-interview';
import { InterviewService } from 'src/app/Services/interview.service';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog';
import { AddInterviewComponent } from '../add-interview/add-interview.component';

@Component({
  selector: 'app-find-all-interviews',
  templateUrl: './find-all-interviews.component.html',
  styleUrls: ['./find-all-interviews.component.css']
})
export class FindAllInterviewsComponent {
  interviews: Interview[] = [];
  calendarEvents: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDayClick.bind(this),
  };

  constructor(private dialog: MatDialog, private interviewService: InterviewService, private router: Router) {}

  ngOnInit() {
    this.getAllInterviews();
  }

  getAllInterviews() {
    this.interviewService.findAllInterviews().subscribe(interviews => {
      this.interviews = interviews;
      this.calendarEvents = interviews.map(interview => ({
        title: this.getInterviewTitle(interview),
        start: interview.dateInterview,
        backgroundColor: this.getBackgroundColor(interview.statusInterview), // Set background color
        borderColor: this.getBorderColor(interview.statusInterview), // Set border color
        url: `/interviews/${interview.interview_id}`,
      }));
    });
  }

  handleDayClick(dateInfo: any) {
    const dialogRef = this.dialog.open(AddInterviewComponent, {
      width: '400px',
      data: { date: dateInfo.dateStr }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog close if needed
    });
  }

  handleEventClick(eventInfo: any) {
    if (eventInfo.event.url) {
      window.location.href = eventInfo.event.url;
    }
  }

  getInterviewTitle(interview: Interview): string {
    return `${interview.type} Interview - ${interview.statusInterview}`;
  }

  getBackgroundColor(status: StatusInterview): string {
    switch (status) {
      case StatusInterview.SCHEDULED:
        return '#ff0000'; // Red for scheduled interviews
      case StatusInterview.IN_PROGRESS:
        return '#ffff00'; // Yellow for interviews in progress
      case StatusInterview.COMPLETED:
        return '#00ff00'; // Green for completed interviews
      case StatusInterview.CANCELED:
        return '#808080'; // Gray for canceled interviews
      default:
        return '#ffffff'; // Default color
    }
  }

  getBorderColor(status: StatusInterview): string {
    switch (status) {
      case StatusInterview.SCHEDULED:
        return '#ff0000';
      case StatusInterview.IN_PROGRESS:
        return '#ffff00';
      case StatusInterview.COMPLETED:
        return '#00ff00';
      case StatusInterview.CANCELED:
        return '#808080';
      default:
        return '#000000';
    }
  }

  openAddInterviewDialog() {
    const dialogRef = this.dialog.open(AddInterviewComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllInterviews();
      }
    });
  }
}
