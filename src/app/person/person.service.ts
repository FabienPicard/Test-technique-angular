import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { GenerationConfig } from "./generation-config";
import { Person } from "./person";

@Injectable({
	providedIn: "root"
})
export class PersonService {

	constructor(private http: HttpClient) {
	}

	getPersons(config: GenerationConfig): Observable<Person[]> {
		return this.http.get<Person[]>("/assets/data/persons.json").pipe(map((response)=>{
			
			 if(config.male && !config.female){
				response = response.filter((data)=>data.gender === "Male");
			} else if(config.female  && !config.male){
				response = response.filter((data)=>data.gender === "Female");
			}

			response.length = config.count

			return response;
		}));
	}
}
