import { OstfaliaApiMenu, OstfaliaApiMenuLane } from './types/ostfalia-api.types';
import fetch from 'cross-fetch';

const API_BASE = "https://sls.api.stw-on.de/v1/location/130/menu"

function laneHasNM(lane: OstfaliaApiMenuLane): boolean {
  return lane.items.some(i => i.tags.categories.some(c => c.id === 'NM'));
}

export class OstfaliaApi {
  private getDate(d: Date) {
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  }

  private sortLanes(menu: OstfaliaApiMenu): OstfaliaApiMenuLane[] {
    const lanes: OstfaliaApiMenuLane[] = [];
    menu.meals.forEach(item => {
      const index = lanes.findIndex(lane => lane.id === item.lane.id);
      if (index > 0) {
        lanes[index].items.push(item);
      } else {
        lanes.push({ ...item.lane, items: [item] });
      }
    });
    return lanes;
  }

  async getTodaysMenu() {
    const d = new Date();
    const url = `${API_BASE}/${this.getDate(d)}`;

    const menu = await fetch(url).then(res => res.json()) as OstfaliaApiMenu;

    if (menu.meals.length === 0) {
      throw new Error("no food today");
    }

    const lanes = this.sortLanes(menu);

    const formattedMenu = lanes
      .map(lane => `<i>${lane.name}${laneHasNM(lane) ? ' 🐴' : ''}</i>\n${lane.items
        .map(item => `<b>${item.name}</b> - ${item.price.student} €`)
        .join('\n')
        }`)
      .join('\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n');

    return [
      `Ostfalia-Speiseplan für ${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`,
      '- - - - - - - - - - - - - - - - - - - - - - - - - - -',
      formattedMenu,
    ].join('\n');
  }
}