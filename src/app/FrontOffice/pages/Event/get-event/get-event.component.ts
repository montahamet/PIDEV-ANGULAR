import {ChangeDetectorRef, Component,AfterViewInit, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Event } from 'src/app/Models/Event';
import { EventService } from 'src/app/Services/Event.service';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from 'src/app/Models/User';
import { Activity } from 'src/app/Models/Activity';
import { RegistrationEvent } from 'src/app/Models/RegistrationEvent';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as bootstrap from "bootstrap";
import {Location} from "@angular/common";
import {PageEvent} from "@angular/material/paginator";
import * as L from 'leaflet';
import {HttpClient} from "@angular/common/http";
import dayGridPlugin from "@fullcalendar/daygrid";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {FullCalendarComponent} from "@fullcalendar/angular";
import interactionPlugin from "@fullcalendar/interaction";

@Component({
  selector: 'app-get-event',
  templateUrl: './get-event.component.html',
  styleUrls: ['./get-event.component.css']
})

export class GetEventComponentF implements OnInit,AfterViewInit {
  events: Event[] = [];
  private map!: L.Map;
  newEvent: Event = new Event();
  newEventForm: FormGroup;
  warningMessage: string = '';
  @ViewChild('warningSuccessModal') warningSuccessModal!: ElementRef;
  @ViewChild('deleteConfirmationModal') deleteConfirmationModal!: ElementRef;
  private eventIdToDelete!: number;
  @ViewChild('updateEventModal') updateEventModal!: ElementRef;
  selectedEvent?: Event;
  updateEventForm: FormGroup;
  event_id!: number;
  event!: Event;
  totalItems = 0;
  currentPage = 0;
  pageSize = 6;
  searchTerm: string  = '';
  searchControl = new FormControl('');
  allEvents: any[] = [];
  @ViewChild('addEventModal') addEventModal!: ElementRef;
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  latitude: number;
  longitude: number;
  locationQuery: string = '';
  @ViewChild('mapModal')
  mapModal!: ElementRef;
  private marker: L.Marker | undefined;
  @ViewChild('updateMapContainer') updateMapContainer!: ElementRef;
  private updateMap: L.Map | undefined;
  calendarPlugins = [dayGridPlugin];
  calendarEvents: any[] = [];
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarOptions: any = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dateClick: this.handleDateClick.bind(this),
  };
  selectedEventDetails: Event | null = null;
  locationSuggestions: any[] = [];
  locationSuggestionsUpdate: any[] = [];
  locationQueryUpdate: string = '';

  constructor(
    private modalService: NgbModal,
    private eventService: EventService,
    private router: Router,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private location: Location,
    private http: HttpClient,


  ) {
    this.latitude = 0;
    this.longitude = 0;
    this.newEventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_date: ['', Validators.required],
      place: [''],
      event_description: ['', Validators.required],
      latitude: [''],
      longitude: [''],
    });
    this.updateEventForm = this.formBuilder.group({
      event_name: ['', Validators.required],
      event_date: ['', Validators.required],
      event_description: [''],
      place: ['', Validators.required],
      latitude: [''],
      longitude: [''],
    });

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: [],
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this) // Ajoutez cette ligne pour gérer le clic sur un événement
    };
  }

  ngAfterViewInit(): void {
    // Ensure the ViewChild references are defined
    if (this.mapModal) {
      const modalElement = this.mapModal.nativeElement;

      // Listen for the 'shown.bs.modal' event without jQuery
      modalElement.addEventListener('shown.bs.modal', () => {
        this.initMap();
      });
    }
  }
  handleEventClick(clickInfo: any) {
    this.selectedEventDetails = this.events.find(event => event.event_id === clickInfo.event.id) || null;

    const modalInstance = this.modalService.open(this.warningSuccessModal, { size: 'lg' });
  }

  handleDateClick(arg: any): void {
    // arg.dateStr contient la date sélectionnée
    console.log('date click! ', arg.dateStr);
    // Ici, vous pouvez ouvrir une modal affichant les événements de cette date
    this.openEventsModal(arg.dateStr);
  }
  openEventsModal(date: string) {
    const modalRef = this.modalService.open( { size: 'lg' });
    modalRef.componentInstance.date = date; // Assurez-vous que `EventsModalComponent` a une propriété `date`
  }

  ngOnInit(): void {
    this.loadEvents(this.currentPage, this.pageSize);
    this.event_id = parseInt(<string>this.route.snapshot.paramMap.get('id'));
    // this.calendarEvents = this.events.map(event => ({
    //   title: event.event_name,
    //   date: event.event_date
    // }));
    // this.calendarOptions = {
    //   initialView: 'dayGridMonth',
    //   plugins: [dayGridPlugin],
    //   events: [
    //
    //   ],
    // };
  }
  fetchSuggestions(query: string, context: 'add' | 'update'): void {
    const url = `https://photon.komoot.io/api/?q=berlin`;
    this.http.get<any>(url).subscribe(data => {
      this.locationSuggestions = data.features;
    });
  }
  selectSuggestion(suggestion: any, context: 'add' | 'update'): void {
    const lat = suggestion.geometry.coordinates[1];
    const lon = suggestion.geometry.coordinates[0];

    if (this.updateMap && this.marker) {
      this.updateMap.setView([lat, lon], 13);
      this.marker.setLatLng([lat, lon]);
    }

    this.locationSuggestions = []; // Clear suggestions
  }
  searchLocation(query: string, context: 'add' | 'update'): void {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    this.http.get<any[]>(url).subscribe(results => {
      if (results.length > 0) {
        const firstResult = results[0];
        const lat = firstResult.lat;
        const lon = firstResult.lon;
        const mapToUpdate = context === 'add' ? this.map : this.updateMap;
        this.updateMapLocation(lat, lon, context); // This method will handle updating the map

        if (mapToUpdate) {
          if (this.marker) {
            this.marker.remove(); // Remove the previous marker
          }

          mapToUpdate.setView([firstResult.lat, firstResult.lon], 13);
          this.marker = L.marker([firstResult.lat, firstResult.lon]).addTo(mapToUpdate);
        }
      } else {
        console.log('No results found');
      }
    });
  }

  updateMapLocation(lat: number, lon: number, context: 'add' | 'update'): void {
    const mapToUpdate = context === 'add' ? this.map : this.updateMap;
    if (mapToUpdate) {
      if (this.marker) {
        this.marker.remove(); // Remove the previous marker
      }
      mapToUpdate.setView([lat, lon], 13);
      this.marker = L.marker([lat, lon]).addTo(mapToUpdate);
    }
  }


  filterEvents(): void {
    console.log('Filtering with searchTerm:', this.searchTerm);
    if (this.searchTerm) {
      this.events = this.allEvents.filter(event =>
        event.event_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.event_description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // Reset the events to allEvents when search term is cleared
      console.log('Resetting events to full list');
      this.events = [...this.allEvents];
    }
  }


  showModalWithMessage(message: string): void {
    this.warningMessage = message;
    const modalInstance = new bootstrap.Modal(this.warningSuccessModal.nativeElement);
    modalInstance.show();
  }

  showUpdateModal(event: Event): void {
    this.selectedEvent = event;
    // Set the form values from the selected event
    this.updateEventForm.patchValue({
      event_name: event.event_name,
      event_date: event.event_date,
      place: event.place,
      event_description: event.event_description,
      latitude: event.latitude,
      longitude: event.longitude,
    });

    const modal = new bootstrap.Modal(this.updateEventModal.nativeElement);
    modal.show();

    this.updateEventModal.nativeElement.addEventListener('shown.bs.modal', () => {
      console.log('Modal is shown, initializing map...');
      if (!this.updateMap && this.updateMapContainer) {
        this.initUpdateMap(event.latitude ?? 0, event.longitude ?? 0);
      }
    }, { once: true });

  }



  loadEvents(pageIndex: number, pageSize: number): void {
    this.eventService.findAllEvent(pageIndex, pageSize).subscribe({
      next: (response) => {
        console.log("API Response:", response);
        this.allEvents = response.content; // Store all events
        this.events = [...this.allEvents]; // Initialize 'events' with 'allEvents' for display
        this.totalItems = response.totalElements;
        this.currentPage = pageIndex;
        this.pageSize = pageSize;
        const calendarEvents = this.allEvents.map((event: any) => ({
          title: event.event_name,
          start: new Date(event.event_date) // Assurez-vous que la date est convertie en objet Date
        }));

        // Mettre à jour les événements du calendrier
        this.calendarComponent.getApi().removeAllEvents();
        this.calendarComponent.getApi().addEventSource(calendarEvents);

        this.cdr.markForCheck(); // Ajoutez ceci après avoir mis à jour calendarOptions

      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.showModalWithMessage('Error loading events. Please try again.');
      }
    });
  }


  changePage(event: PageEvent): void {
    this.loadEvents(event.pageIndex, event.pageSize);
  }


  nextPage(): void {
    if (this.currentPage < (this.totalItems / this.pageSize) - 1) {
      this.currentPage++;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadEvents(this.currentPage, this.pageSize);
    }
  }


  addEvent(): void {
    if (this.newEventForm.valid) {
      const newEvent: Event = this.newEventForm.value;
      this.map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        console.log(`New event location: ${lat}, ${lng}`);
        this.newEventForm.patchValue({
          place: `${lat}, ${lng}` // Or any other format you prefer
        });
      });

      this.eventService.addEvent(newEvent).subscribe(
        () => {
          this.showModalWithMessage('Event is add successfully!');

          console.log('Event added successfully.');
          this.newEventForm.reset();
          this.loadEvents(this.currentPage, this.pageSize);
          this.cdr.detectChanges();

        },
        error => {
          this.showModalWithMessage('Error adding event:');
        }
      );
    }
  }
  askDeleteConfirmation(activityId: number): void {
    this.eventIdToDelete = activityId;
    const modal = new bootstrap.Modal(this.deleteConfirmationModal.nativeElement);
    modal.show();
  }
  confirmDeletion(): void {
    this.eventService.hasRelatedActivities(this.eventIdToDelete).subscribe(canDelete => {
      if (canDelete) {
        this.showModalWithMessage('Event cannot be deleted because it has related activities.');
      } else {
        this.eventService.deleteEvent(this.eventIdToDelete).subscribe(() => {
          this.showModalWithMessage('Event deleted successfully!');
          this.loadEvents(this.currentPage, this.pageSize); // Refresh the events list
        }, error => {
          this.showModalWithMessage('Error deleting the event. Please try again.');
        });
      }
    });

    const modalInstance = bootstrap.Modal.getInstance(this.deleteConfirmationModal.nativeElement);
    if (modalInstance) {
      modalInstance.hide();
    }
  }

  checkAndDeleteEvent(event_id: number): void {
    this.eventService.hasRelatedActivities(event_id).subscribe((hasRelated: boolean) => {
      if (hasRelated) {
        this.showModalWithMessage('This event has related activities and cannot be deleted.');
      } else {
        this.askDeleteConfirmation(event_id);
      }
    }, (error: any) => {
      console.error('Error checking for related activities:', error);
    });
  }
  loadRelatedData(event: Event): void {
    this.eventService.getRelatedUsers(event.event_id).subscribe(
      (users: User[]) => {
        if (users && users.length > 0) {
          event.users = users;
        }
      },
      (error: any) => {
        console.error('Error loading related users:', error);
      }
    );

    this.eventService.getRelatedActivities(event.event_id).subscribe(
      (activities: Activity[]) => {
        event.Activitys = activities;
      },
      (error: any) => {
        console.error('Error loading related activities:', error);
      }
    );

    this.eventService.getRelatedRegistrations(event.event_id).subscribe(
      (registrations: RegistrationEvent[]) => {
        event.RegistationEvents = registrations;
      },
      (error: any) => {
        console.error('Error loading related registrations:', error);
      }
    );
  }
  onUpdateEvent(): void {
    if (this.updateEventForm.valid && this.selectedEvent) {
      const updatedEvent = {
        ...this.selectedEvent, // Include all fields from the selected event
        ...this.updateEventForm.value, // Overwrite with updated values from the form
      };

      this.eventService.updateEvent(updatedEvent.event_id, updatedEvent).subscribe({
        next: () => {
          this.showModalWithMessage('Event updated successfully!');
          this.loadEvents(this.currentPage, this.pageSize); // Reload events list to show the updated event
          // Close the modal here if it's not automatically closed upon form submission
        },
        error: (error) => {
          console.error('Error updating event:', error);
          this.showModalWithMessage('Error updating event.');
        }
      });
    }
  }

  private initUpdateMap(latitude: number = 51.505, longitude: number = -0.09): void {
    if (this.updateMapContainer && this.updateMapContainer.nativeElement) {
      // Clear any existing map instance before initializing a new one
      if (this.updateMap) {
        this.updateMap.off(); // Detach all event listeners
        this.updateMap.remove(); // Properly remove the map
        this.updateMap = undefined;
      }

      // Initialize the map
      this.updateMap = L.map(this.updateMapContainer.nativeElement, {
        center: [latitude, longitude],
        zoom: 13
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.updateMap);

      // Listen for click events on the map
      this.updateMap.on('click', (e: L.LeafletMouseEvent) => {
        console.log('Map clicked', e.latlng);
        const { lat, lng } = e.latlng;

        // Make sure there's a map to add the marker to
        if (this.updateMap) {
          // Remove the existing marker if it exists
          if (this.marker) {
            this.marker.remove();
          }

          // Add a new marker to the map at the clicked location
          this.marker = L.marker([lat, lng]).addTo(this.updateMap);

          // Perform reverse geocoding to get the address
          const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

          this.http.get<any>(geocodeUrl).subscribe(data => {
            const address = data.display_name; // The full address as a string
            console.log("Retrieved address:", address);

            // Update the form with the address and coordinates
            this.updateEventForm.patchValue({
              place: address, // Update the address field in your form
              latitude: lat,
              longitude: lng,
            });
          }, error => {
            console.error("Error fetching location name", error);
          });
        }
      });
    } else {
      console.error('Update map container is not defined.');
    }
  }

  private initMap(): void {

    if (!this.mapContainer) {
      console.error('Map container is not available');
      return;
    }
    if (this.map) {
      this.map.remove();
    }


    this.map = L.map(this.mapContainer.nativeElement).setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
    this.map.on('click', (e) => {

      if (this.marker) {
        this.map.removeLayer(this.marker);
      }

      const { lat, lng } = e.latlng;
      this.marker = L.marker([lat, lng]).addTo(this.map);


      this.saveLocation(lat, lng);
    });

  }
  private saveLocation(latitude: number, longitude: number): void {
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    this.http.get<any>(geocodeUrl).subscribe(data => {
      // Supposons que le champ 'place' dans le formulaire est utilisé pour stocker le nom de l'emplacement
      const locationName = data.display_name; // Ou utilisez un autre chemin dans l'objet data selon le format de réponse

      this.newEventForm.patchValue({
        place: locationName, // Mettez à jour le nom de l'emplacement dans le formulaire
        latitude: latitude,
        longitude: longitude
      });

      console.log("Location name updated:", locationName);
      // Note: Pas besoin d'appeler un service ici si le formulaire sera soumis pour sauvegarder l'événement
    }, error => {
      console.error("Error fetching location name", error);
    });
  }




}
