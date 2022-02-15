import Portfolio from './Portfolio.mjs';

class Stock {
    constructor(arrayDates) {
        this.content = arrayDates;
    }
    Price(date) {
        for (let index = 0; index < this.content.length; index++) {
            const element = this.content[index];
            if (+element.fecha === +date) {
                return element.precio
            }
        }
        return 0;
    }

}

let stockTest = [
    { fecha: new Date('1995-12-30'), precio: 10 },
    { fecha: new Date('1995-12-31'), precio: 20 },
    { fecha: new Date('1996-01-01'), precio: 30 },
    { fecha: new Date('1996-01-02'), precio: 40 },
    { fecha: new Date('1996-01-03'), precio: 50 },
    { fecha: new Date('1996-01-04'), precio: 60 },
]

let stock1 = new Stock(stockTest)
let stock2 = new Stock(stockTest)


let portfolioTemp = new Portfolio();
portfolioTemp.addStock(stock1);
portfolioTemp.addStock(stock2);

let test = portfolioTemp.Profit(new Date('1995-12-30'), new Date('1996-01-04'));
console.log(test);
