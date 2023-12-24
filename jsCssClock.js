import { LightningElement } from 'lwc';
import clockBG from '@salesforce/resourceUrl/JS_30_D2_Clock';

export default class JsCssClock extends LightningElement {
	hours;
	minutes;
	seconds;
	meridiem;
	cl = console.log.bind(console);
	get backgroundStyle() {
		return `background: url('${clockBG}');`;
	}

	timeFetch = () => {
		let currTime = new Date();
		this.hours = currTime.getHours();
		this.minutes = currTime.getMinutes();
		this.seconds = currTime.getSeconds();
	};

	timeUpdate = () => {
		this.cl(this.hours + ":" + this.minutes + ":" + this.seconds);
	};

	needle = () => {
		let hx, mx, sx;
		hx = this.hours > 12 ? this.hours - 12 : this.hours;
		this.meridiem = this.hours > 12 ? `PM` : `AM`;
		hx = (hx * 30) + 90;
		mx = (this.minutes * 6) + 90;
		sx = (this.seconds * 6) + 90;
		this.cl(`Hdeg : `, hx, ` mdeg : `, mx, ` sdeg : `, sx);

		const HrX = this.template.querySelector('.hour-hand');
		const MinX = this.template.querySelector('.min-hand');
		const SecX = this.template.querySelector('.second-hand');

		HrX.style.transform = `rotate(${hx}deg)`;
		MinX.style.transform = `rotate(${mx}deg)`;
		SecX.style.transform = `rotate(${sx}deg)`;
	}


	connectedCallback() {
		setInterval(() => {
			this.timeFetch();
			this.timeUpdate();
			this.needle();
		}, 1000);
	}
}