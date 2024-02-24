import { ChartArea } from "chart.js";

/**
 * creates gradient for a canvas context
 *
 * @param ctx get a context for the canvas that the graph resides on
 * @param area area of the graph currently displayed
 * @param color color of the gradient
 * @param colorStart color of the bottom of the gradient(defaulted to white)
 * @returns a gradient
 */
export const createGradient = (
  ctx: CanvasRenderingContext2D,
  area: ChartArea,
  color: string,
  colorStart?: string
) => {
  if (colorStart === undefined) colorStart = "rgba(255, 255, 255, 0.2)";

  //create gradient in the canvas context
  const gradient = ctx.createLinearGradient(0, area.bottom - 20, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, color);

  return gradient;
};
