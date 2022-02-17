/*
* Portfolio returns an array of dict with the fomat [{year:year,profit: profit of all the stocks from that year }]
* Asumptions:
    Stocks is a class that use the javascript Date class,
    Stock.price() returns 0 is the date wasn't found and only returns positive numbers
*/

export default class Portfolio {
    constructor() {
        this.stocksList = [];
    }

    addStock(stock) {
        this.stocksList.push(stock)
    }

    Profit(startDate, endDate) {

        //in case the order is inverse or the same date just return 0 
        if (startDate >= endDate) {
            return [{ year: startDate.getFullYear(), profit: 0 }];
        }

        //fills an array from startDate to endDate with {year:year,profit:0}
        let yearsTotal = endDate.getFullYear() - startDate.getFullYear();
        let stockProfit = Array(yearsTotal + 1).fill(0).map(
            (element, index) => (
                { year: startDate.getFullYear() + index, profit: 0 }
            )
        )

        //loop through the stock list and get the profit of each stock
        for (let i = 0; i < this.stocksList.length; i++) {
            const stock = this.stocksList[i];

            let currentDate = new Date(startDate);
            let nextDate = new Date(startDate)
            nextDate.setDate(nextDate.getDate() + 1)

            //for each stock obtain the profit comparing the current date stock with the next one 
            //and save it to the stockprofit in the respective year
            while (currentDate < endDate) {
                const currentStockPrice = stock.Price(currentDate);
                const nextStockPrice = stock.Price(nextDate);

                const dateProfit = nextStockPrice - currentStockPrice;
                const yearIndex = currentDate.getFullYear() - startDate.getFullYear();
                stockProfit[yearIndex].profit += dateProfit;

                currentDate.setDate(currentDate.getDate() + 1);
                nextDate.setDate(nextDate.getDate() + 1);
            }
        }
        return stockProfit;
    }
}