import { Token } from "../../hoiformat/hoiparser";

export interface WorldMapData {
    width: number;
    height: number;
    provinces: (Province | undefined | null)[]; // count of provinces
    states: (State | undefined | null)[];
    countries: Country[];
    strategicRegions: (StrategicRegion | undefined | null)[];
    provincesCount: number;
    statesCount: number;
    countriesCount: number;
    strategicRegionsCount: number;
    badProvincesCount: number; // will be * -1
    badStatesCount: number; // will be * -1;
    badStrategicRegionsCount: number;
    continents: string[];
    terrains: Terrain[];
    warnings: Warning[];
}

export interface ProvinceBmp {
    width: number;
    height: number;
    colorByPosition: number[]; // width * height
    colorToProvince: Record<number, ProvinceGraph>;
    provinces: ProvinceGraph[];
}

export interface ProvinceMap {
    width: number;
    height: number;
    colorByPosition: number[]; // width * height
    provinces: (Province | undefined | null)[]; // count of provinces
    badProvincesCount: number;
    continents: string[];
    terrains: Terrain[];
}

export interface ProvinceGraph {
    color: number;
    boundingBox: Zone;
    coverZones: Zone[];
    edges: ProvinceEdgeGraph[];
}

export interface ProvinceDefinition {
    id: number;
    color: number;
    type: string;
    coastal: boolean;
    terrain: string;
    continent: number;
}

export type Province = Omit<ProvinceGraph & ProvinceDefinition, 'edges'> & {
    edges: ProvinceEdge[];
};

export interface ProvinceEdgeGraph {
    toColor: number;
    path: Point[][];
}

export interface ProvinceEdgeAdjacency {
    from: number;
    to: number;
    through?: number;
    type: 'impassable' | string;
    start?: Point;
    stop?: Point;
    rule?: string;
    row: string[];
}

export type ProvinceEdge = Omit<ProvinceEdgeGraph & ProvinceEdgeAdjacency, 'from' | 'row' | 'toColor'>;

export interface State {
    id: number;
    name: string;
    manpower: number;
    category: string;
    owner: string | undefined;
    provinces: number[];
    cores: string[];
    impassable: boolean;
    victoryPoints: Record<number, number | undefined>;
    boundingBox: Zone;
    file: string;
    token: Token | null;
}

export interface Warning {
    text: string;
    source: WarningSource[];
    relatedFiles: string[];
}

export type WarningSource = WarningSourceProvince | WarningSourceIdOnly;

interface WarningSourceBase {
    type: string;
}

interface WarningSourceProvince extends WarningSourceBase {
    type: 'province';
    id: number | null;
    color: number;
}

interface WarningSourceIdOnly extends WarningSourceBase {
    type: 'state' | 'strategicregion' | 'supplyarea';
    id: number;
}

export interface Country {
    tag: string;
    color: number;
}

export interface Terrain {
    name: string;
    color: number;
    isNaval: boolean;
}

export interface StrategicRegion {
    id: number;
    name: string;
    provinces: number[];
    navalTerrain: string | null;
    file: string;
    token: Token | null;
}

export interface Point {
    x: number;
    y: number;
}

export interface Zone {
    x: number;
    y: number;
    w: number;
    h: number;
}

export type WorldMapMessage = LoadedMessage | RequestMapItemMessage | MapItemMessage | ErrorMessage | ProgressMessage | ProvinceMapSummaryMessage | OpenFileMessage;

export interface LoadedMessage {
    command: 'loaded';
    force: boolean;
}

export interface RequestMapItemMessage {
    command: 'requestprovinces' | 'requeststates' | 'requestcountries' | 'requeststrategicregions';
    start: number;
    end: number;
}

export interface MapItemMessage {
    command: 'provinces' | 'states' | 'countries' | 'warnings' | 'continents' | 'terrains' | 'strategicregions';
    data: string;
    start: number;
    end: number;
}

export interface ErrorMessage {
    command: 'error';
    data: string;
}

export interface ProgressMessage {
    command: 'progress';
    data: string;
}

export interface ProvinceMapSummaryMessage {
    command: 'provincemapsummary';
    data: WorldMapData;
}

export interface OpenFileMessage {
    command: 'openfile';
    type: 'state' | 'strategicregion';
    file: string;
    start: number | undefined;
    end: number | undefined;
}

export type ProgressReporter = (progress: string) => Promise<void>;
