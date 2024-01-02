const currencyFormatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'EUR'
});

export function formatCents(amount: number) {
	return currencyFormatter.format(amount / 100);
}
