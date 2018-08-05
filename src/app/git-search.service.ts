import { Injectable, Inject } from '@angular/core';
import { GitSearch } from './git-search';
import { HttpClient } from '@angular/common/http';
import { GitUsers } from './git-users';
import { Observable } from 'rxjs';
//import {map, publishReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {
  cachedSearches: string;
  cachedUsers: Array<{
    [query: string]: GitUsers
  }> = [];
  search: Observable<GitSearch>;
  constructor(private http: HttpClient) { 
  }

  gitSearch : Function = (query: string): Observable<GitSearch> => {
    if (!this.search) {
      this.search = this.http.get<GitSearch>('https://api.github.com/search/repositories?q=' + query);
      //.publishReplay(1)
     // .refCount();
      this.cachedSearches = query;
    } else if(this.cachedSearches !== query){
      this.search = null;
      this.gitSearch(query);
    }
    return this.search;
  }

  gitUsers = (query: string) : Promise<GitUsers> => {
    let promise = new Promise<GitUsers>((resolve, reject) => {
        if (this.cachedUsers[query]) {
            resolve(this.cachedUsers[query])
        }
        else {
            this.http.get('https://api.github.com/search/users?q=' + query)
            .toPromise()
            .then( (response) => {
                resolve(response as GitUsers)
            }, (error) => {
                reject(error);
            })
        }
    })
    return promise;
  }
}
