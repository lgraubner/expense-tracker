import {
	CarIcon,
	CatIcon,
	CrossIcon,
	DumbbellIcon,
	FerrisWheelIcon,
	GiftIcon,
	GlassWaterIcon,
	HomeIcon,
	PizzaIcon,
	ShirtIcon,
	TramFrontIcon,
	UtensilsIcon,
	WalletCardsIcon
} from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export const categoryIcons: Record<string, ComponentType> = {
	car: CarIcon,
	clothes: ShirtIcon,
	'eating-out': PizzaIcon,
	entertainment: FerrisWheelIcon,
	food: UtensilsIcon,
	gifts: GiftIcon,
	health: CrossIcon,
	living: HomeIcon,
	pets: CatIcon,
	sports: DumbbellIcon,
	toiletry: GlassWaterIcon,
	transport: TramFrontIcon,
	misc: WalletCardsIcon
};
