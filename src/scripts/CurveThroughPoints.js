export default function curveThroughPoints( points, ctx ) {

  let i, n, a, b, x, y;

  for ( i = 1, n = points.length - 2; i < n; i++ ) {

    a = points[i];
    b = points[i + 1];

    x = ( a.x + b.x ) * 0.5;
    y = ( a.y + b.y ) * 0.5;

    ctx.quadraticCurveTo( a.x, a.y, x, y );
  }

  a = points[i];
  b = points[i + 1];

  ctx.quadraticCurveTo( a.x, a.y, b.x, b.y );
}
