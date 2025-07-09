precision mediump float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 resolution;
uniform float time;
uniform float mouse;   // from mouseX (0 to width)
uniform float mouseY;  // new: from mouseY (0 to height)

// Convert 0–255 RGB to 0.0–1.0
vec3 rgb(float r, float g, float b){
    return vec3(r / 255.0, g / 255.0, b / 255.0);
}

// Color wheel for rainbow
vec3 hsv2rgb(float h, float s, float v) {
    vec3 rgb = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return v * mix(vec3(1.0), rgb, s);
}

// Polygon shape function
vec4 poly(float x, float y, float size, float sides, float rotation, vec3 col){
    vec2 coord = gl_FragCoord.xy;
    vec2 pos = vec2(x, y) - coord;
    float angle = atan(pos.x, pos.y) + PI + rotation;
    float radius = TWO_PI / sides;
    float d = cos(floor(0.5 + angle / radius) * radius - angle) * length(pos);
    float edge = 1.0 - smoothstep(size * 0.5, size * 0.5 + 1.0, d);
    return vec4(col, edge);
}

void main() {
    vec2 center = resolution * 0.5;
    
    // 🎯 Shape size based on vertical mouse position
    float size = mix(resolution.y * 0.2, resolution.y * 0.8, mouseY / resolution.y);

    // 🌀 Smooth sides control from mouseX
    float sides = floor(mix(3.0, 12.0, mouse / resolution.x));

    // ⏱ Time-based rotation
    float rotation = time * 1.5;

    // 🌈 Rainbow hue shifts with time
    float hue = mod(time * 0.1, 1.0);
    vec3 rainbow = hsv2rgb(hue, 0.6, 1.0);

    // 🌌 Background color
    vec3 bgColor = rgb(20.0, 10.0, 30.0); // dark spacey purple

    // ✨ Draw main polygon
    vec4 mainPoly = poly(center.x, center.y, size, sides, rotation, rainbow);

    // 🔆 Add outer glow (larger, faded shape)
    vec4 glowPoly = poly(center.x, center.y, size + 10.0, sides, rotation, vec3(1.0));
    glowPoly.a *= 0.05; // fade the glow

    // 🔀 Blend everything
    vec3 resultColor = bgColor;
    resultColor = mix(resultColor, glowPoly.rgb, glowPoly.a); // add glow
    resultColor = mix(resultColor, mainPoly.rgb, mainPoly.a); // add main shape

    gl_FragColor = vec4(resultColor, 1.0);
}
