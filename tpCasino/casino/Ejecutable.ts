import * as readlineSync from 'readline-sync';

import { Jugador } from './Jugador';
import { Casino } from './Casino';
import { HotHot } from './HotHot';
import { JokerJoker } from './JokerJoker';
import { Dados } from './Dados';
import { Ruleta } from './Ruleta';
import { HistorialDePartidas } from './historialDePartidas';

//Se crea un objeto casino para almacenar la instancia que contiene el nombre y el saldo actual del casino.
let casino = new Casino("codigo de la suerte", 1000000);
//se crea un objeto por cada jugador del casino almacenando la instancia que contiene el nombre y el saldo actual del jugador.
let jugador1 = new Jugador("Martin", 20000);

//se crea un objeto por cada juego del casino almacenando su nombre
const joker = new JokerJoker("Tragamonedas_Joker");
const hot = new HotHot("Tragamonedas_Hot");
const dados = new Dados("Dados");
const ruleta = new Ruleta("Ruleta");

//El casino almacena todos los objetos creados para cada juego en una lista
casino.setJuegos(joker);
casino.setJuegos(hot);
casino.setJuegos(dados);
casino.setJuegos(ruleta);

/*Se inicia la aplicación del casino 
    se le dan instrucciones al usuario sobre como utilizar la aplicación
    y se manejan posibles errores de entrada de datos
*/
console.log("¡Bienvenido a " + casino.getNombre() + "!\n" +
    "En este casino podrá disfrutar de varios juegos de azar, realizar apuestas y obtener distintas ganancias.\n" +
    "Al finalizar la partida, podrá consultar su historial de apuestas en el archivo 'historialDePartidas.txt', \n" + "ubicado en la carpeta 'configuracion'.\n" +
    "¡Le deseamos mucha suerte!");

iniciarSession();
function iniciarSession() {
    let opcionValida = false;
    //El bucle se repite hasta que el usuario ingrese una opción válida
    while (!opcionValida) {
        const opcion = readlineSync.question("¿Desea cargar saldo en su cuenta? 1 para cargar, 0 para continuar: ");
        if (opcion === '0') {
            // Si el saldo del jugador es nulo no va a poder jugar a ningún juego.
            if (jugador1.getSaldo() === 0) {
                console.log("No tiene suficiente saldo para jugar. Por favor recargue su saldo y vuelva a intentar.\n"); 
            } else {
                // Si el jugador tiene saldo suficiente, puede elegir un juego.
                elegirJuego(casino);
                // El bucle se cierra cuando el usuario haya elegido correctamente una de las opciones
                opcionValida = true;
            }
        } else if (opcion === '1') {
            let saldoCargado = false;
            while (!saldoCargado) {
                //Si el saldo fue cargado con exito retorna true
                saldoCargado = jugador1.cargarSaldo(); 
                if (!saldoCargado) {
                    console.log("El valor ingresado no es válido. Asegúrese de que el monto sea un número válido y mayor o igual a 500.\n");
                }
            }
            // Si el saldo fue cargado correctamente, el jugador va a poder elegir un juego
            elegirJuego(casino);
            // El bucle se cierra cuando el usuario haya elegido correctamente una de las opciones
            opcionValida = true; 
        } else {
            console.log("Opción inválida. Por favor, ingrese '1' para cargar saldo o '0' para continuar.\n");
        }
    }
}

function elegirJuego(casino: Casino): void {
    let seguirJugando = true;

    while (seguirJugando) {
        console.log("Juegos disponibles:");
        //Se imprime una lista enumerada de todos los juegos disponibles
        casino.imprimirJuegos();
        let juegoSeleccionado: number = 0;
        let opcionValida = false;

        // Bucle para validar que el usuario ingrese un número válido
        while (!opcionValida) {
            //El usuario debe elegir el número de una de las opciones disponibles
            const juego = readlineSync.question("Elegir un juego (1/2/...): ");
            /* La lista enumerada se relaciona con las posiciones del array que almacena los juegos,
            debido a esto cuando almaceno el número del juego seleccionado debo restar 1 posición,
            considerando que la lista enumerada comenzó en 1 y las posiciones del array comienzan en 0. */
            juegoSeleccionado = parseInt(juego) - 1; 
            // Se evalúa que la variable 'juegoSeleccionado' contenga un valor numérico
            // y que ese valor no sea menor a cero ni mayor a la cantidad de juegos disponibles.
            if (isNaN(juegoSeleccionado) || juegoSeleccionado < 0 || juegoSeleccionado >= casino.getJuegos().length) {
                console.log("Opción no válida. Por favor, elija un número válido.\n");
            } else {
                opcionValida = true;
            }
        }

        // Como los datos son correctos, se da inicio a la partida solicitada,
        // utilizando como parámetros (el objeto casino, el número del juego seleccionado y la instancia del jugador actual).
        iniciarJuego(casino, juegoSeleccionado, jugador1);

         // La partida finalizó con éxito y se le solicita al jugador confirmar si desea jugar a otro juego 
        // o si desea finalizar su sesión dentro del casino.
        try {
            const respuesta = readlineSync.questionInt("¿Desea jugar otro juego? (1 para cambiar de juego, 0 para salir del casino):\n");

            if (respuesta === 0) {
                  // La variable 'seguirJugando' cambia su valor a false y el bucle finaliza.
                seguirJugando = false;
                console.log("Gracias por jugar. ¡Vuelva pronto!");
            } else if (respuesta !== 1) {
                 // Si el valor numérico está fuera de rango, se emite un mensaje de error,
                // se repite el bucle y el valor se solicita nuevamente.
                console.log("Opción no válida. Por favor, elija 1 para cambiar de juego, 0 para salir del casino.\n");
            }
        } catch (error) {
            // Si el valor ingresado no es numérico, se emite un mensaje de error,
            // se repite el bucle y el valor se solicita nuevamente.
            console.log("Entrada inválida. Debe ingresar un número (0 o 1).\n");
        }
    }
}

function iniciarJuego(casino: Casino, juegoIndex: number, jugador1: Jugador): void {
    const juegos = casino.getJuegos();
    //Se utiliza el numero del juego elegido como indice para acceder al objeto almacenado en la lista de juegos disponibles.
    const juegoSeleccionado = juegos[juegoIndex];
    let seguirJugando = true;
    let apuesta = 0, saldoInicial = 0, ganancia = 0;

    while (seguirJugando) {
        switch (juegoSeleccionado.getNombre()) {
            case "Dados":
                console.log("El juego de Dados ha sido iniciado.\n" + "Saldo actual del jugador = " + jugador1.getSaldo() + "\n");
                apuesta = dados.elegirApuesta();
                //se verifica si la apuesta es menor o igual al saldo del jugador
                if (jugador1.saldoInsuficiente (apuesta)) {
                    console.log("Apuesta inválida. Verifique su saldo disponible y el monto seleccionado.\n");
                    return;
                }
                //Se almacena el saldo actual del jugador para reflejar posteriormente su aumento o disminucion en relación a los resultados de la partida
                saldoInicial = jugador1.getSaldo();
                //Se da inicio al juego de dados y se evaluan los resultados
                dados.jugar(apuesta);
                //Se imprime el resultado de la apuesta realizada.
                console.log("Apuesta realizada = " + apuesta + "\n" + "Ganancias obtenidas = " + dados.getCreditoActual + "\n");
                //Se almacena las ganancias obtenidas por el jugador durante la partida para almacenarlo posteriormente en su historial de apuestas.
                ganancia = dados.getCreditoActual();
                //en base a la ganancia obtenida se actualiza el saldo del jugador y del casino
                casino.actualizarSaldo(jugador1, casino, apuesta, ganancia);
                //Se informan los resultados finales de la partida, la apuesta realizada por el jugador y su saldo actual.
                console.log("Apuesta realizada = " + apuesta + "\n" + "Ganancias obtenidas = " + dados.getCreditoActual() + "\n" + "Saldo actual del jugador = " + jugador1.getSaldo());
                //Se carga el resultado de la partida en el historial de partidas
                HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), juegoSeleccionado.getNombre(), apuesta, ganancia, jugador1.getSaldo());
                break;
            case "Ruleta":
                console.log("El juego de la Ruleta ha sido iniciado.\n" + "Saldo actual del jugador = " + jugador1.getSaldo() + "\n");
                //Se imprimen los numeros de la ruleta
                ruleta.imprimirNumerosRuleta ();
                
                if (jugador1.getSaldo() === 0) {
                    console.log("Apuesta inválida. Verifique su saldo disponible y el monto seleccionado.\n");
                    return;
                }
        
                //Como se van a realizar multiples apuestas en una sola se pasa como parametro el saldo del jugador para evitar errores durante las apuestas.
                apuesta = ruleta.elegirApuesta(jugador1.getSaldo());
                //Se almacena el saldo actual del jugador para reflejar posteriormente su aumento o disminucion en relación a los resultados de la partida
                saldoInicial = jugador1.getSaldo();
                //Se da inicio a la ruleta y se evaluan los resultados
                ruleta.jugar();
                //Se almacena las ganancias obtenidas por el jugador durante la partida para almacenarlo posteriormente en su historial de apuestas.
                ganancia = ruleta.getCreditoActual();
                if (ganancia === 0) {
                    ganancia = apuesta * (-1);
                }
                
                //en base a la ganancia obtenida se actualiza el saldo del jugador y del casino
                casino.actualizarSaldo(jugador1, casino, apuesta, ganancia);
                //Se imprime el resultado de la apuesta realizada.
                console.log("Apuesta realizada = " + apuesta + "\n" + "Ganancias obtenidas = " + ruleta.getCreditoActual () + "\n" + "Saldo actual del jugador = " + jugador1.getSaldo());
                //Se carga el resultado de la partida en el historial de partidas
                HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), juegoSeleccionado.getNombre(), apuesta, ganancia, jugador1.getSaldo());
                break;
            case "Tragamonedas_Joker":
                console.log("El juego de Joker ha sido iniciado.\n" + "Saldo actual del jugador = " + jugador1.getSaldo() + "\n");
                //Se imprime una lista con las apuestas disponibles en el juego
                joker.printApuestasDisponibles();
                //Se elige uno de los valores numericos de la lista de apuestas
                apuesta = joker.elegirApuesta(jugador1.getSaldo());
                /*Si la apuesta seleccionada es mayor al saldo actual del jugador
                entonces se emite un mensaje de error, se repite el bucle, y se vuelven a solicitar los datos.*/
                if (jugador1.saldoInsuficiente(apuesta)) {
                    console.log("Apuesta inválida. Verifique su saldo disponible y el monto seleccionado.\n");
                    return;
                }
                //Se almacena el saldo actual del jugador para reflejar posteriormente su aumento o disminucion en relación a los resultados de la partida
                saldoInicial = jugador1.getSaldo();
                //Se imprimen los carretes del tragamonedas y sus resultados aleatorios.
                joker.imprimirCarretes();
                //Se analiza el resultado obtenido en los carretes y se evaluan combinaciones ganadoras
                joker.jugar(apuesta);
                //Se almacena las ganancias obtenidas por el jugador durante la partida para almacenarlo posteriormente en su historial de apuestas.
                ganancia = jugador1.getSaldo() - saldoInicial;
                //Si el resultado no es igual a cero el jugador aumenta su saldo en base al resultado obtenido y el casino lo disminuye en base a la apuesta realizada.
                casino.actualizarSaldo(jugador1, casino, apuesta, ganancia);
                //Se informan los resultados finales de la partida, la apuesta realizada por el jugador y su saldo actual.
                console.log("Apuesta realizada = " + apuesta + "\n" + "Ganancias obtenidas = " + joker.getResultado() + "\n" + "Saldo actual del jugador = " + jugador1.getSaldo());
                //Se carga el resultado obtenido en el historial de partidas
                HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), juegoSeleccionado.getNombre(), apuesta, ganancia, jugador1.getSaldo());
                break;

            case "Tragamonedas_Hot":
                console.log("El juego de Hot ha sido iniciado.\n" + "Saldo actual del jugador = " + jugador1.getSaldo() + "\n");
                //Se imprime una lista con las apuestas disponibles en el juego
                hot.printApuestasDisponibles();
                //Se elige uno de los valores numericos de la lista de apuestas
                apuesta = hot.elegirApuesta(jugador1.getSaldo());
                /*Si la apuesta seleccionada es mayor al saldo actual del jugador  
                entonces se emite un mensaje de error, se repite el bucle, y se vuelven a solicitar los datos.*/
                if (jugador1.saldoInsuficiente(apuesta)) {
                    console.log("Apuesta inválida. Verifique su saldo y el monto.\n");
                    return;
                }
                //Se almacena el saldo actual del jugador para reflejar posteriormente su aumento o disminucion en relación a los resultados de la partida
                saldoInicial = jugador1.getSaldo();
                //Se imprimen los carretes del tragamonedas y sus resultados aleatorios.
                hot.imprimirCarretes();
                //Se analiza el resultado obtenido en los carretes y se evaluan combinaciones ganadoras
                hot.jugar(apuesta);
                //Si el resultado no es igual a cero el jugador aumenta su saldo en base al resultado obtenido y el casino lo disminuye en base a la apuesta realizada.
                casino.actualizarSaldo(jugador1, casino, apuesta, ganancia);
                //Se almacena las ganancias obtenidas por el jugador durante la partida para almacenarlo posteriormente en su historial de apuestas.
                ganancia = jugador1.getSaldo() - saldoInicial;
                //Se informan los resultados finales de la partida, la apuesta realizada por el jugador y su saldo actual.
                console.log("Apuesta realizada = " + apuesta + "\n" + "Ganancias obtenidas = " + hot.getResultado() + "\n" + "Saldo actual del jugador = " + jugador1.getSaldo());
                //Se carga el resultado de la partida en el historial de partidas
                HistorialDePartidas.registrarPartida(jugador1.getNombreJugador(), juegoSeleccionado.getNombre(), apuesta, ganancia, jugador1.getSaldo());
                break;
        }

        try {
            //Se le pide al usuario confirmar si desea realizar otra partida en el mismo juego o cambiar por otro
            const respuesta = readlineSync.questionInt("¿Desea seguir jugando? (1 para continuar, 0 para salir del juego):\n");
            if (respuesta === 0) {
                seguirJugando = false;
                console.log("Gracias por jugar. ¡Vuelva pronto!");
            } else if (respuesta !== 1) {
                //Si el valor ingresado no es igual a 1 se emite un mensaje de error, se repite el bucle y el valor se solicita nuevamente.
                console.log("Opción no válida. Por favor, elija 1 para continuar o 0 para salir.\n");
            }
        } catch {
            //Si el valor ingresado no es numerico se emite un mensaje de error, se repite el bucle y el valor se solicita nuevamente.
            console.log("Entrada inválida. Debe ingresar un número (0 o 1).\n");
        }
    }
}
