import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SuperHero, SuperHeroResponse, SearchResponse } from '../interfaces/superhero.interface';

@Injectable({
  providedIn: 'root'
})
export class MockSuperHeroService {
  private readonly mockHeroes: SuperHero[] = [
    {
      id: '644',
      name: 'Superman',
      powerstats: {
        intelligence: '94',
        strength: '100',
        speed: '100',
        durability: '100',
        power: '100',
        combat: '85'
      },
      biography: {
        'full-name': 'Clark Joseph Kent',
        'alter-egos': 'Superman Prime One Million',
        aliases: ['Clark Joseph Kent', 'Kal-El', 'The Man of Steel', 'The Man of Tomorrow', 'The Last Son of Krypton', 'Big Blue', 'Clarkie', 'The Metropolis Marvel', 'The Action Ace'],
        'place-of-birth': 'Kryptonopolis, Krypton',
        'first-appearance': 'Superman #1 (June, 1938)',
        publisher: 'DC Comics',
        alignment: 'good'
      },
      appearance: {
        gender: 'Male',
        race: 'Kryptonian',
        height: ['6\'3', '191 cm'],
        weight: ['225 lbs', '101 kg'],
        'eye-color': 'Blue',
        'hair-color': 'Black'
      },
      work: {
        occupation: 'Reporter for the Daily Planet and novelist',
        base: 'Metropolis'
      },
      connections: {
        'group-affiliation': 'Justice League of America, The Legion of Super-Heroes (pre-Crisis), Justice Society of America (pre-Crisis), All-Star Squadron',
        relatives: 'Lois Lane (wife), Jor-El (father, deceased), Lara (mother, deceased), Jonathan Kent (adoptive father), Martha Kent (adoptive mother), Supergirl (Kara Zor-El, cousin), Superboy (Kon-El/Conner Kent, partial clone)'
      },
      image: {
        url: 'https://www.superherodb.com/pictures2/portraits/10/100/791.jpg'
      }
    },
    {
      id: '70',
      name: 'Batman',
      powerstats: {
        intelligence: '100',
        strength: '26',
        speed: '27',
        durability: '50',
        power: '47',
        combat: '100'
      },
      biography: {
        'full-name': 'Bruce Wayne',
        'alter-egos': 'No alter egos found.',
        aliases: ['Insider', 'Matches Malone'],
        'place-of-birth': 'Crest Hill, Bristol Township; Gotham County',
        'first-appearance': 'Detective Comics #27',
        publisher: 'DC Comics',
        alignment: 'good'
      },
      appearance: {
        gender: 'Male',
        race: 'Human',
        height: ['6\'2', '188 cm'],
        weight: ['210 lbs', '95 kg'],
        'eye-color': 'Blue',
        'hair-color': 'Black'
      },
      work: {
        occupation: 'Businessman',
        base: 'Batcave, Gotham City; Hall of Justice, Justice League Watchtower'
      },
      connections: {
        'group-affiliation': 'Batman Family, Batman Incorporated, Justice League, Outsiders, Wayne Enterprises, Club of Heroes, formerly White Lantern Corps, Sinestro Corps',
        relatives: 'Damian Wayne (son), Dick Grayson (adopted son), Tim Drake (adopted son), Jason Todd (adopted son), Cassandra Cain (adopted ward), Martha Wayne (mother, deceased), Thomas Wayne (father, deceased), Alfred Pennyworth (former guardian), R\'as al Ghul (father-in-law, deceased), Talia al Ghul (ex-wife), Nyssa Raatko (sister-in-law), Carrie Kelley (foster daughter), Terry McGinnis (adopted son), Bruce Wayne (Earth-2) (father, deceased)'
      },
      image: {
        url: 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg'
      }
    },
    {
      id: '149',
      name: 'Wonder Woman',
      powerstats: {
        intelligence: '88',
        strength: '100',
        speed: '79',
        durability: '100',
        power: '100',
        combat: '100'
      },
      biography: {
        'full-name': 'Diana Prince',
        'alter-egos': 'No alter egos found.',
        aliases: ['Princess Diana', 'Princess of the Amazons', 'Goddess of Truth', 'Wondy', 'Wonder Girl', 'The Amazon Princess', 'Fastball', 'Mental Fish'],
        'place-of-birth': 'Themyscira',
        'first-appearance': 'All Star Comics #8',
        publisher: 'DC Comics',
        alignment: 'good'
      },
      appearance: {
        gender: 'Female',
        race: 'Amazon',
        height: ['6\'0', '183 cm'],
        weight: ['165 lbs', '74 kg'],
        'eye-color': 'Blue',
        'hair-color': 'Black'
      },
      work: {
        occupation: 'Adventurer, Emissary to the world of Man, Protector of Paradise Island; former Goddess of Truth',
        base: 'Mount Olympus; formerly Paradise Island, also known as Themyscira; formerly Boston, Massachusetts; formerly London, England'
      },
      connections: {
        'group-affiliation': 'Justice League of America, Justice Society of America (pre-Crisis Earth-2 version), All-Star Squadron (pre-Crisis Earth-2 version)',
        relatives: 'Queen Hippolyta (mother, deceased), Donna Troy (Troia) (magical twin/younger sister), Antiope (aunt, deceased), General Phillipus (aunt), Steve Trevor (husband, deceased), Hippolyta Trevor (daughter, deceased), Lyta Milton (daughter, deceased), Fury (adopted daughter), Cassie Sandsmark (younger sister), Zeus (father), Ares (uncle), Deimos (uncle), Phobos (uncle), Eris (aunt), Eros (uncle), Hermes (uncle), Hercules (uncle), Hippolyta (Earth-2) (mother, deceased), Donna Troy (Earth-2) (sister, deceased), Steve Trevor (Earth-2) (husband, deceased)'
      },
      image: {
        url: 'https://www.superherodb.com/pictures2/portraits/10/100/807.jpg'
      }
    },
    {
      id: '346',
      name: 'Iron Man',
      powerstats: {
        intelligence: '100',
        strength: '85',
        speed: '58',
        durability: '85',
        power: '100',
        combat: '64'
      },
      biography: {
        'full-name': 'Anthony Edward Stark',
        'alter-egos': 'No alter egos found.',
        aliases: ['Iron Knight', 'Hogan Potts', 'Spare Parts Man', 'Cobalt Man II', 'Crimson Dynamo', 'Ironman', 'Ti-Co', 'The Tin Man', 'Iron Avenger', 'Dugan', 'Director of S.H.I.E.L.D.'],
        'place-of-birth': 'Long Island, New York',
        'first-appearance': 'Tales of Suspense #39 (March, 1963)',
        publisher: 'Marvel Comics',
        alignment: 'good'
      },
      appearance: {
        gender: 'Male',
        race: 'Human',
        height: ['6\'6', '198 cm'],
        weight: ['425 lbs', '191 kg'],
        'eye-color': 'Blue',
        'hair-color': 'Black'
      },
      work: {
        occupation: 'Inventor, Industrialist; former United States Secretary of Defense',
        base: 'Seattle, Washington'
      },
      connections: {
        'group-affiliation': 'Avengers, Illuminati, S.H.I.E.L.D., Stark Industries, Stark Resilient; formerly Force Works, New Avengers, Mighty Avengers, Hellfire Club (outer circle), Armor Wars, Pro-Registration, War Machine, Knights of the Atomic Round Table',
        relatives: 'Howard Anthony Stark (father, deceased), Maria Stark (mother, deceased), Morgan Stark (uncle), Isaac Stark (grandfather), Nathaniel Richards (paternal distant relative), Tony Stark (Earth-982) (alternate reality son), Howard Stark (Earth-1610) (father, deceased), Maria Stark (Earth-1610) (mother, deceased)'
      },
      image: {
        url: 'https://www.superherodb.com/pictures2/portraits/10/100/85.jpg'
      }
    },
    {
      id: '659',
      name: 'Spider-Man',
      powerstats: {
        intelligence: '90',
        strength: '55',
        speed: '67',
        durability: '75',
        power: '74',
        combat: '85'
      },
      biography: {
        'full-name': 'Peter Parker',
        'alter-egos': 'No alter egos found.',
        aliases: ['Spiderman', 'Bag-Man', 'Black Marvel', 'Captain Universe', 'Dusk', 'Green Hood', 'Hornet', 'Mad Dog 336', 'Peter Palmer', 'Prodigy', 'Ricochet', 'Scarlet Spider', 'Spider-Boy', 'Spider-Hulk', 'Spider-Morphosis', 'Spider-Phantom', 'Spider-Phoenix', 'Spider-Venom', 'Spidey', 'Spy-Der', 'Supaidaman', 'The Amazing Spider-Man', 'The Bombastic Bag-Man', 'The Cosmic Spider-Man', 'The Dark Spider-Man', 'The Friendly Neighborhood Spider-Man', 'The Human Spider', 'The Sensational Spider-Man', 'The Spectacular Spider-Man', 'The Spider', 'The Spider-Man', 'The Web-Spinner', 'The Web-Swinging Spider', 'The Web-Head', 'Web-Spinner'],
        'place-of-birth': 'Queens, New York',
        'first-appearance': 'Amazing Fantasy #15',
        publisher: 'Marvel Comics',
        alignment: 'good'
      },
      appearance: {
        gender: 'Male',
        race: 'Human',
        height: ['5\'10', '178 cm'],
        weight: ['165 lbs', '74 kg'],
        'eye-color': 'Hazel',
        'hair-color': 'Brown'
      },
      work: {
        occupation: 'Freelance photographer, teacher',
        base: 'New York, New York'
      },
      connections: {
        'group-affiliation': 'Member of the Avengers, formerly member of Outlaws, alternate Fantastic Five',
        relatives: 'Richard Parker (father, deceased), Mary Parker (mother, deceased), Benjamin Parker (uncle, deceased), May Parker (aunt), Mary Jane Watson-Parker (wife), May Parker (daughter), Ben Parker (son), Teresa Parker (sister, deceased), Richard Parker (Earth-982) (alternate reality father), Mary Parker (Earth-982) (alternate reality mother), Benjamin Parker (Earth-982) (alternate reality uncle), May Parker (Earth-982) (alternate reality aunt), Mary Jane Watson (Earth-982) (alternate reality wife), May Parker (Earth-982) (alternate reality daughter), Ben Parker (Earth-982) (alternate reality son)'
      },
      image: {
        url: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg'
      }
    }
  ];

  // Signals para manejar el estado
  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  // Obtener héroe por ID
  getHeroById(id: string): Observable<SuperHeroResponse> {
    this.loading.set(true);
    this.error.set(null);

    return new Observable(observer => {
      setTimeout(() => {
        const hero = this.mockHeroes.find(h => h.id === id);
        if (hero) {
          observer.next({
            response: 'success',
            ...hero
          });
        } else {
          observer.next({
            response: 'error',
            id: id,
            name: 'Hero not found',
            powerstats: { intelligence: '0', strength: '0', speed: '0', durability: '0', power: '0', combat: '0' },
            biography: { 'full-name': '', 'alter-egos': '', aliases: [], 'place-of-birth': '', 'first-appearance': '', publisher: '', alignment: '' },
            appearance: { gender: '', race: '', height: [''], weight: [''], 'eye-color': '', 'hair-color': '' },
            work: { occupation: '', base: '' },
            connections: { 'group-affiliation': '', relatives: '' },
            image: { url: '' }
          });
        }
        this.loading.set(false);
        observer.complete();
      }, 500);
    });
  }

  // Buscar héroes por nombre
  searchHeroesByName(name: string): Observable<SearchResponse> {
    this.loading.set(true);
    this.error.set(null);

    return new Observable(observer => {
      setTimeout(() => {
        const filteredHeroes = this.mockHeroes.filter(hero =>
          hero.name.toLowerCase().includes(name.toLowerCase()) ||
          hero.biography['full-name'].toLowerCase().includes(name.toLowerCase())
        );

        observer.next({
          response: 'success',
          'results-for': name,
          results: filteredHeroes
        });

        this.loading.set(false);
        observer.complete();
      }, 500);
    });
  }

  // Método para obtener héroes populares
  getPopularHeroes(): Observable<SuperHeroResponse>[] {
    const popularIds = ['70', '644', '149', '346', '659'];
    return popularIds.map(id => this.getHeroById(id));
  }

  // Método para manejar errores
  handleError(error: any): void {
    this.loading.set(false);
    this.error.set(error.message || 'Error al cargar los datos');
    console.error('Error en Mock SuperHero Service:', error);
  }

  // Método para limpiar errores
  clearError(): void {
    this.error.set(null);
  }
}
