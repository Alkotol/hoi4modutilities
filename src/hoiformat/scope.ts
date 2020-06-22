import { arrayToMap } from "../util/common";

export type ScopeType = 'country' | 'state' | 'leader' | 'operative' | 'unknown';

export interface Scope {
    scopeName: string;
    scopeType: ScopeType;
}

export interface ScopeDef {
    name: string;
    from: ScopeType | '*';
    to: ScopeType;
    condition: boolean;
    effect: boolean;
}

export const countryScope: Scope = { scopeName: '', scopeType: 'country' };

function scopeDef(name: string, condition: boolean, effect: boolean, from: ScopeType | '*', to: ScopeType): ScopeDef {
    return { name, condition, effect, from, to };
}

export const scopeDefs = arrayToMap([
    scopeDef("all_unit_leader", true, false, 'country', 'leader'),
    scopeDef("any_unit_leader", true, false, 'country', 'leader'),
    scopeDef("all_army_leader", true, false, 'country', 'leader'),
    scopeDef("any_army_leader", true, false, 'country', 'leader'),
    scopeDef("all_navy_leader", true, false, 'country', 'leader'),
    scopeDef("any_navy_leader", true, false, 'country', 'leader'),
    scopeDef("random_unit_leader", false, true, 'country', 'leader'),
    scopeDef("every_unit_leader", false, true, 'country', 'leader'),
    scopeDef("random_army_leader", false, true, 'country', 'leader'),
    scopeDef("every_army_leader", false, true, 'country', 'leader'),
    scopeDef("random_navy_leader", false, true, 'country', 'leader'),
    scopeDef("every_navy_leader", false, true, 'country', 'leader'),
    scopeDef("global_every_army_leader", false, true, '*', 'leader'),
    scopeDef("OVERLORD", true, true, 'country', 'country'),
    // scoepDef("TAG"),
    scopeDef("any_country", true, false, '*', 'country'),
    scopeDef("any_country_with_original_tag", true, false, '*', 'country'),
    scopeDef("any_neighbor_country", true, false, 'country', 'country'),
    scopeDef("any_home_area_neighbor_country", true, false, 'country', 'country'),
    scopeDef("any_guaranteed_country", true, false, 'country', 'country'),
    scopeDef("any_allied_country", true, false, 'country', 'country'),
    scopeDef("any_other_country", true, false, 'country', 'country'),
    scopeDef("any_enemy_country", true, false, 'country', 'country'),
    scopeDef("any_occupied_country", true, false, 'country', 'country'),
    scopeDef("all_neighbor_country", true, false, 'country', 'country'),
    scopeDef("all_country", true, false, '*', 'country'),
    scopeDef("all_country_with_original_tag", true, false, '*', 'country'),
    scopeDef("all_allied_country", true, false, 'country', 'country'),
    scopeDef("all_guaranteed_country", true, false, 'country', 'country'),
    scopeDef("all_enemy_country", true, false, 'country', 'country'),
    scopeDef("all_occupied_country", true, false, 'country', 'country'),
    // scopeDef("state_id"),
    scopeDef("any_state", true, false, '*', 'state'),
    scopeDef("any_controlled_state", true, false, 'country', 'state'),
    scopeDef("any_owned_state", true, false, 'country', 'state'),
    scopeDef("any_neighbor_state", true, false, 'state', 'state'),
    scopeDef("all_state", true, false, '*', 'state'),
    scopeDef("all_controlled_state", true, false, 'country', 'state'),
    scopeDef("all_owned_state", true, false, 'country', 'state'),
    scopeDef("all_neighbor_state", true, false, 'state', 'state'),
    scopeDef("every_country", false, true, '*', 'country'),
    scopeDef("every_country_with_original_tag", false, true, '*', 'country'),
    scopeDef("every_other_country", false, true, 'country', 'country'),
    scopeDef("every_neighbor_country", false, true, 'country', 'country'),
    scopeDef("every_enemy_country", false, true, 'country', 'country'),
    scopeDef("every_occupied_country", false, true, 'country', 'country'),
    scopeDef("random_country", false, true, '*', 'country'),
    scopeDef("random_country_with_original_tag", false, true, '*', 'country'),
    scopeDef("random_neighbor_country", false, true, 'country', 'country'),
    scopeDef("random_enemy_country", false, true, 'country', 'country'),
    scopeDef("random_occupied_country", false, true, 'country', 'country'),
    scopeDef("random_state", false, true, '*', 'state'),
    scopeDef("random_owned_state", false, true, 'country', 'state'),
    scopeDef("random_controlled_state", false, true, 'country', 'state'),
    scopeDef("random_owned_controlled_state", false, true, 'country', 'state'),
    scopeDef("random_neighbor_state", false, true, 'state', 'state'),
    scopeDef("every_state", false, true, '*', 'state'),
    scopeDef("every_controlled_state", false, true, 'country', 'state'),
    scopeDef("every_owned_state", false, true, 'country', 'state'),
    scopeDef("every_neighbor_state", false, true, 'state', 'state'),
    scopeDef("capital_scope", true, true, 'country', 'state'),
    scopeDef("owner", false, true, 'state', 'country'),
    scopeDef("controller", false, true, 'state', 'country'),
    scopeDef("all_operative_leader", true, false, 'country', 'operative'),
    scopeDef("any_operative_leader", true, false, 'country', 'operative'),
    scopeDef("every_operative", false, true, 'country', 'operative'),
    scopeDef("random_operative", false, true, 'country', 'operative'),
], 'name');