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

        let stockProfit = [{ year: startDate.getFullYear(), profit: 0 }]

        //used to keep track of the years alerady on stockProfit
        const yearsSet = new Set();
        yearsSet.add(startDate.getFullYear())

        //loop through the stock list and get the profit of each stock
        for (let i = 0; i < this.stocksList.length; i++) {
            const stock = this.stocksList[i];

            let currentDate = new Date(startDate);
            let stockTotal = 0;

            let currentStockPrice = stock.Price(currentDate);
            let nextStockPrice = 0;

            let stockYear = startDate.getFullYear()

            //for each stock obtain the profit comparing the current date stock with the next one
            while (currentDate < endDate) {
                currentDate.setDate(currentDate.getDate() + 1);

                //if there is a new year in the date add it to the set and push it to the stockProfile
                if (currentDate.getFullYear() !== stockYear) {
                    for (let j = 0; j < stockProfit.length; j++) {
                        if (stockProfit[j].year === stockYear) {
                            stockProfit[j].profit += stockTotal;

                            stockYear = currentDate.getFullYear()
                            stockTotal = 0;

                            if (!yearsSet.has(stockYear)) {
                                stockProfit.push({ year: stockYear, profit: 0 })
                                yearsSet.add(stockYear)
                            }
                            break;
                        }
                    }
                }
                nextStockPrice = stock.Price(currentDate);

                stockTotal += nextStockPrice - currentStockPrice;
                currentStockPrice = nextStockPrice
            }
            //save the current stock to the current year
            for (let j = 0; j < stockProfit.length; j++) {
                if (stockProfit[j].year === stockYear) {
                    stockProfit[j].profit += stockTotal;
                    break;
                }
            }
        }
        return stockProfit;
    }
}