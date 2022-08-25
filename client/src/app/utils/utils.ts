export function formatNumber(value: number) {
    return value === 0 ? 0 : value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}