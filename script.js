// Wyszukaj atrybut id i nasluchuj na zdarzenie na klikniecie przycisku aby zarejestrowac metode zatrzymujaca zegar
let startButton = document.getElementById( 'start' )
startButton.addEventListener('click', () => stopwatch.start() )

// Wyszukaj atrybut id i nasluchuj na zdarzenie na klikniecie przycisku aby zarejestrowac metode zatrzymujaca zegar
let stopButton = document.getElementById( 'stop' )
stopButton.addEventListener( 'click', () => stopwatch.stop() )

// Stworz konstruktor w klasie i przekaz odpowiednie parametry 
class Stopwatch {
    constructor( display ) {
        // parametr odpowiedzialny za to czy stoper pracuje, domyslnie wylaczony 
        this.running = false
        // parametr przechowujacy element DOM wyswietlajacy tarcze stopera
        this.display = display
        // parametr resetujacy licznik
        this.reset()
        // parametr drukujacy czasy
        this.print( this.times )
    }
    // Metoda ktora ustawia czasy w domyslnym polozeniu
    reset() {
        this.times = {
            // Ustawianie poczatkowe czasu dla minut
            minutes: 0,
            // Ustawianie poczatkowe czasu dla sekund
            seconds: 0,
            // Ustawianie poczatkowe czasu dla milisekund
            miliseconds: 0
        };
    }
    // Metoda ktora ustawia wewnetrzny tekst elementu DOM znajdujacy sie pod atrybutem display
    print() {
        this.display.innerText = this.format(this.times)
    }
    // Metoda zwraca szablon do pozniejszego wyswietlenia ktory wykorzystuje obiekt times podany do metody jako argument
    format( times ) {
        return `${ pad0( times.minutes ) } : ${ pad0( times.seconds ) } : ${ pad0( Math.floor( times.miliseconds) ) }`
    }
    // Metoda ktora sprawdza czy nasz stoper juz nie chodzi
    start() {
        // Jesli stoper aktualnie nie chodzi, to wykonaj ponizsza instrukcje
        if( !this.running ) {
            // Przypisz flage running aby uruchomic stoper
            this.running = true
            // Przypisz flage watch i ustaw funkcje zajmujaca sie interwalami ktora przyjmuje jako pierwszy argument callback
            this.watch = setInterval( () => this.step(), 10)
        }
    }
    // Metoda stop ktora zatrzymuje nasz czas w stoperze
    stop() {
        // Przypisz flage running aby zatrzymac stoper
        this.running = false
        // Wyczysc interwal odwolujac sie do parametru watch
        clearInterval( this.watch )
    }
    // Metoda sprawdzajaca czy nasz licznik jest juz uruchomiony
    step() {
        // Jesli nasz licznik jest urchomiony to zwroc nastepujace metody
        if( !this.running ) return
        // Metoda ktora ma za zadanie przeliczac odpowiednio minuty, sekundy i milisekundy
        this.calculate()
        // Metoda ktora drukuje wynik
        this.print()
    }
    // Metoda ktora zeruje wartosci milisekund i sekund
    calculate() {
        // Zwieksz w parametrze times milisekundy o 1 na samym poczatku urchomionego stopera
        this.times.miliseconds += 1
        // Jesli na tablicy milisekundy sa wieksze lub rowne 100 -
        // Dlaczego 100? Poniewaz nasz stoper wyswietla dwie cyfry obok siebie zamiast trzech. 
        // Stad tez trzeba 1000 milisekund ( odpowiednik jednej sekundy) podzielic przez 10 co nam daje 100
        if( this.times.miliseconds >= 100 ) {
            // - zwieksz tablice z sekundami o 1
            this.times.seconds += 1
            // Nastepnie wyzeruj tablice z milisekundami
            this.times.miliseconds = 0
        }
        // Jesli sekundy sa wieksze lub rowne 60
        if( this.times.seconds >= 60 ) {
            // Zwieksz tablice z minutami o 1
            this.times.minutes += 1
            // Wyzeruj tablice z sekundami
            this.times.seconds = 0
        }
    }
}
// Funkcja ktorej zadaniem jest dodanie zera do liczb jednocyfrowych
function pad0( value ) {
    // Funkcja przyjmuje wartosc liczbowa przeksztalcajac na stringa
    let result = value.toString()
    // Sprawdz czy dlugosc tablicy tego stringa jest mniejsza niz 2
    if( result.length < 2 ) {
        // Jesli tak, to jako rezultat dodaj zero przed ta liczbe
        result = '0' + result
    }
    // zwroc tablice rezultatow
    return result
}

// Stworz instancje klasy ktora pobierze klase przycisku zatrzymujacego czas
const stopwatch = new Stopwatch(
document.querySelector( '.stopwatch' ) )