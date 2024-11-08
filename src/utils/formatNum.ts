export const formatNum = (num: number): string => 
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");