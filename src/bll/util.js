
/**
 * 时间格式化
 * @param {Date} date
 * @param {string} formate
 */
exports.dateFormate = function(date,formate){
    let time = date.toLocaleString('chinese',{hour12:false});
    let times = time.split(/\/|:| |-/g);
    let regs = [/yyyy/g,/MM/g,/dd/g,/HH/g,/mm/g,/ss/g];

    for(let i = 0;i<regs.length;i++)
    {
        formate = formate.replace(regs[i],times[i]);
    }

    formate =formate.replace(/hh/g,times[4]-12);

    return formate;
}

