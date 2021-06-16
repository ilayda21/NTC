function getData() {
    const data = [
        {
            "productid": "LT-1449506",
            "productName": "Super Outfit",
            "productPrice": 300.45,
            "qnty": 10
        },
        {
            "productid": "LT-4523632",
            "productName": "Rocket-Powered Roller Skates",
            "productPrice": 11367.99,
            "qnty": 4
        },
        {
            "productid": "TM-2026045",
            "productName": "Giant Kite Kit",
            "productPrice": 1099.90,
            "qnty": 12
        },
        {
            "productid": "LT-1990790",
            "productName": "Bird Seed",
            "productPrice": 5.90,
            "qnty": 55
        },
        {
            "productid": "TLTS-8002604",
            "productName": "Artificial Rock",
            "productPrice": 123.99,
            "qnty": 24
        },
        {
            "productid": "TM-6792415",
            "productName": "Giant Rubber Band V1",
            "productPrice": 44.90,
            "qnty": 5000
        },
        {
            "productid": 'LT-8163469',
            "productName": 'Jet Motor',
            "productPrice": 99999.99,
            "qnty": 2
        }
    ];

    return data.map(dt => {
        return {...dt, 
            total: formatNum(dt['qnty'] * dt['productPrice']),
            productPrice: formatNum(dt['productPrice'])
        }
    });
}

function formatData(data) {
    return data.map(dt => {
        return {...dt, 
            total: toLocaleString(dt['qnty'] * dt['productPrice']),
            productPrice: toLocaleString(dt['productPrice'])
        }
    });
}

function toLocaleString(num) {
    return num.toLocaleString(undefined,{ minimumFractionDigits: 2 });
}

function formatNum(num) {
    return (Math.round(((num) + Number.EPSILON) * 100) / 100);
}

function totalCost(data) {
    const mappedData = data.map(dt =>  parseFloat(dt['total'].replace(".", "").replace(",", ".")));
    return toLocaleString(formatNum(mappedData.reduce((item1, item2) => item1 + item2,  0)));
}

function numToString(totalCostAsString) {
    // 489.475,50 -> ["489.475", "50"]
    const parsedAccordingToComma = totalCostAsString.split(",");
    // 489.475 -> ["489", "475"]
    let parsedAccoringToDot = parsedAccordingToComma[0].split(".");

    let result = [];
    let convertedNum;
    let groupNumName;
    for (let i = 0; i < parsedAccoringToDot.length; i++) {
        convertedNum = convertNum(parsedAccoringToDot[i]);
        convertedNum.length !== 0 && result.push(...convertedNum);

        groupNumName = getGroupedNumName(i, parsedAccoringToDot.length); 
        groupNumName.length !== 0 && result.push(groupNumName);
    }

    result.push("lira");

    if (parsedAccordingToComma.length === 2) {
        convertedNum = convertNum(parsedAccordingToComma[1]);
        if(convertedNum.length !== 0) {
            result.push(...convertedNum);
            result.push("kuruş");
        }
    }

    return result.reduce((firstElem, secondElem) => firstElem + " " + secondElem);
}

function convertNum(parsedNumAccoringToDot) {
    let result = [];
    // i = 0 => [4, 8, 9]
    let parsedByNum = parsedNumAccoringToDot.split("");
    let numName;
    for(let j = 0; j < parsedByNum.length; j++) {
        numName = getSingleNumName(parsedByNum[j], (parsedByNum.length - j) === 2);
        numName !== "" && result.push(numName);
        if (parsedByNum.length === 3 && j === 0) {
            if (result[j] === "bir") result.pop();
            result.push("yüz");
        }
    }
    return result;
}

function getGroupedNumName(ind, totalGroupLength) {
    const indToCheck = totalGroupLength - (ind + 1);
    let result = "";
    switch (indToCheck) {
        case 1:
            result = "bin";    
            break;
        case 2:
            result = "milyon";
            break;
        case 3:
            result = "milyar";
            break;
        default:
            break;
    }
    return result;
}

function getSingleNumName(num, asSecondElement) {
    let result = "";
    switch (num) {
        case "1":
            result = asSecondElement ? "on" : "bir";
            break;
        case "2":
            result = asSecondElement ? "yirmi" : "iki";
            break;
        case "3":
            result = asSecondElement ? "otuz" : "üç";
            break;
        case "4":
            result = asSecondElement ? "kırk" : "dört";
            break;
        case "5":
            result = asSecondElement ? "elli" : "beş";
            break;
        case "6":
            result = asSecondElement ? "altmış" : "altı";
            break;
        case "7":
            result = asSecondElement ? "yetmiş" : "yedi";
            break;
        case "8":
            result = asSecondElement ? "seksen" : "sekiz";
            break;
        case "9":
            result = asSecondElement ? "doksan" : "dokuz";
            break;
        case 0:                                                                                                            
        default:
            break;
    }
    return result;
}