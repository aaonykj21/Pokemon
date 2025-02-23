import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { response } from 'express';

interface PokemonResult {
  name: string;
  // คุณสามารถเพิ่มคุณสมบัติอื่น ๆ ที่คาดว่าจะได้จาก result ได้
}
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit{
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number = 0;

  constructor(
    private dataService: DataService
  ){}

 ngOnInit(): void{
  this.getPokemons();
 }
 getPokemons(){
  this.dataService.getPokemons(this.page + 0,10)
  .subscribe((response: any) => {
    this.totalPokemons = response.count;
    response.results.forEach((result: PokemonResult)=> {
      this.dataService.getMoreData(result.name)
      .subscribe((uniqResponse: any) => {
        this.pokemons.push(uniqResponse);
        console.log(this.pokemons);
      });
    })
  });
 }
}
