import { BookSchema } from './model';
import { getActualResourceMap } from './resources';

const schema: BookSchema = [
  { name: 'title', props: {}, children: ['Simple schema'] },
  { name: 'resource', props: { path: '/image', src: './image.png' }, children: [] },
];

describe('test resources', () => {
  it('default map', () => {
    const map = getActualResourceMap({ schema });

    expect(Array.from(map.entries())).toEqual([['/image', { src: './image.png' }]]);
  });

  it('map with raw prefix', () => {
    const map = getActualResourceMap({ schema, resourceOptions: { rawPrefix: './assets/' } });

    expect(Array.from(map.entries())).toEqual([['/image', { src: './assets/./image.png' }]]);
  });

  it('map with prefix', () => {
    const map = getActualResourceMap({ schema, resourceOptions: { prefix: './assets' } });

    expect(Array.from(map.entries())).toEqual([['/image', { src: './assets/image.png' }]]);
  });

  it('map with custom values', () => {
    const map = getActualResourceMap({
      schema,
      resourceOptions: { pathMap: new Map([['/image', { src: 'protocol://12345.png' }]]) },
    });

    expect(Array.from(map.entries())).toEqual([['/image', { src: 'protocol://12345.png' }]]);
  });
});
