export * from './throttleByAnimationFrame';

export let circleImageSrc = (width = 100, height?: number) => {
  if (height === undefined) {
    height = width;
  }
  return `https://picsum.photos/${width}/${height}`;
}
