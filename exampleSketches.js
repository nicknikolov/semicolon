exports.load = function () {
  for (sketch in exampleSketches) {
    localStorage.setItem(sketch.toString(), exampleSketches[sketch]);
  }
}

var exampleSketches = {
  Example_Cubes:
    "ArrayList<Box> boxes; \n" +
    "float n; \n" +
    " \n" +
    "void setup() { \n" +
    "  size(screenWidth, screenHeight, OPENGL); \n" +
    "  boxes = new ArrayList(); \n" +
    "  colorMode(HSB, 360, 100, 100, 100); \n" +
    "  mouseY = height; \n" +
    "} \n" +
    " \n" +
    "void draw() { \n" +
    "  background(0); \n" +
    "  directionalLight(180, 0, 100, -10, 10, 0); \n" +
    " \n" +
    "  for (int i = boxes.size ()-1; i >= 0; i--) { \n" +
    "    Box box = boxes.get(i); \n" +
    "    box.display(); \n" +
    "    if (box.finished()) { \n" +
    "      boxes.remove(i); \n" +
    "      boxes.add(new Box()); \n" +
    "    } \n" +
    "  } \n" +
    " \n" +
    "  n = frameCount % 100; \n" +
    "  if (n == 99 && boxes.size() < 20) { \n" +
    "    boxes.add(new Box()); \n" +
    "  } \n" +
    "} \n" +
    " \n" +
    "class Box { \n" +
    "  float zIndex = -2000; \n" +
    "  float w, h, t = 0, num, col; \n" +
    " \n" +
    "  Box() { \n" +
    "    w = random(width); \n" +
    "    h = random(height); \n" +
    "    num = random(100); \n" +
    "    col = random(360); \n" +
    "  } \n" +
    " \n" +
    "  void display() { \n" +
    " \n" +
    "    float cx = 0; \n" +
    "    float cy = 0; \n" +
    "    float R = 100; \n" +
    "    float theta = t * 0.05; \n" +
    "    float x = cx + R * sin(theta); \n" +
    "    float y = cy + R * cos(theta); \n" +
    " \n" +
    "    noStroke(); \n" +
    "    fill(col, 100, 100, t); \n" +
    "    pushMatrix(); \n" +
    "    translate(w, h, zIndex); \n" +
    "    rotateX(degrees((num * 0.5) + frameCount*0.0005)); \n" +
    "    rotateY(degrees(num + 45)); \n" +
    "    box(50); \n" +
    "    popMatrix(); \n" +
    "    update(); \n" +
    "  } \n" +
    " \n" +
    "  void update() { \n" +
    "    zIndex += mouseY*0.05; \n" +
    " \n" +
    "    if (zIndex < -1000) { \n" +
    "      t+=0.5; \n" +
    "    } else if (zIndex > -100) { \n" +
    "      t-=1; \n" +
    "    } \n" +
    "  } \n" +
    " \n" +
    "  boolean finished() { \n" +
    "    boolean dead; \n" +
    "    if (zIndex > 350) { \n" +
    "      dead = true; \n" +
    "    } else { \n" +
    "      dead = false; \n" +
    "    } \n" +
    "    return dead; \n" +
    "  } \n" +
    "} \n",
  Example_Slinky:
    "ArrayList<Particle> particles; \n" +
    " \n" +
    "float col = random(360); \n" +
    " \n" +
    "void setup() { \n" +
    "  size(screen.width, screen.height); \n" +
    "  colorMode(HSB, 360, 100, 100, 100); \n" +
    "  particles = new ArrayList<Particle>(); \n" +
    "  rectMode(CENTER); \n" +
    "} \n" +
    " \n" +
    "void draw() { \n" +
    "  background(0); \n" +
    " \n" +
    "  for (int i = particles.size ()-1; i >= 0; i--) { \n" +
    "    Particle particle = particles.get(i); \n" +
    "    particle.run(); \n" +
    "    if (particle.finished()) { \n" +
    "      particles.remove(i); \n" +
    "    } \n" +
    "  } \n" +
    "} \n" +
    " \n" +
    "void mouseDragged() { \n" +
    "  mousePressed(); \n" +
    "} \n" +
    " \n" +
    "void touchMove(TouchEvent touchEvent) { \n" +
    "  for (int i = 0; i < touchEvent.touches.length; i++) { \n" +
    "    int x = touchEvent.touches[i].offsetX; \n" +
    "    int y = touchEvent.touches[i].offsetY; \n" +
    "    particles.add(new Particle(col, x, y)); \n" +
    "  } \n" +
    "} \n" +
    " \n" +
    "void touchStart(TouchEvent touchEvent) { \n" +
    "  col = random(360); \n" +
    "} \n" +
    " \n" +
    "class Particle { \n" +
    "  PVector position = new PVector(); \n" +
    " \n" +
    "  float s = 40; \n" +
    "  float t = 0; \n" +
    "  float num; \n" +
    "  float sz; \n" +
    " \n" +
    "  Particle(float col, float x, float y) { \n" +
    "    num = col; \n" +
    "    position.set(x, y); \n" +
    "    sz = noise(num); \n" +
    "  } \n" +
    " \n" +
    "  void run() { \n" +
    "    display(); \n" +
    "    update(); \n" +
    "  } \n" +
    " \n" +
    "  void display() { \n" +
    "    pushStyle(); \n" +
    "    noStroke(); \n" +
    "    pushMatrix(); \n" +
    "    fill(num, 100, 100, s); \n" +
    " \n" +
    "    float cx = position.x; \n" +
    "    float cy = position.y; \n" +
    "    float r = 100; \n" +
    "    float theta = s * 0.2; \n" +
    "    float a = cx + r * sin(theta); \n" +
    "    float b = cy + r * cos(theta); \n" +
    " \n" +
    "    ellipse(a, b, sz * 200, sz * 200); \n" +
    "    popMatrix(); \n" +
    "    popStyle(); \n" +
    "  } \n" +
    " \n" +
    "  void update() { \n" +
    "    s-=0.5; \n" +
    "    num+=2; \n" +
    "    if (num > 360) num = 1; \n" +
    "  } \n" +
    " \n" +
    "  boolean finished() { \n" +
    "    if (s == 0) { \n" +
    "      return true; \n" +
    "    } else { \n" +
    "      return false; \n" +
    "    } \n" +
    "  } \n" +
    "} \n",
  Example_Spirals:
    "ArrayList<Particle> particles; \n" +
    " \n" +
    "void setup() { \n" +
    "  size(screen.width, screen.height); \n" +
    "  colorMode(HSB, 360, 100, 100, 100); \n" +
    "  particles = new ArrayList<Particle>(); \n" +
    "} \n" +
    " \n" +
    "void draw() { \n" +
    "  background(0); \n" +
    "  for (int i = particles.size ()-1; i >= 0; i--) { \n" +
    "    Particle particle = particles.get(i); \n" +
    "    particle.run(); \n" +
    "    if (particle.finished()) { \n" +
    "      particles.remove(i); \n" +
    "    } \n" +
    "  } \n" +
    "} \n" +
    " \n" +
    "void mouseDragged() { \n" +
    "  mousePressed(); \n" +
    "} \n" +
    " \n" +
    "void mousePressed() { \n" +
    "  particles.add(new Particle()); \n" +
    "} \n" +
    " \n" +
    "class Particle { \n" +
    "  PVector position = new PVector(); \n" +
    " \n" +
    "  float s = 50; \n" +
    "  float t = 100; \n" +
    " \n" +
    "  Particle() { \n" +
    "    position.set(mouseX%(width/2), mouseY%(height/2)); \n" +
    "  } \n" +
    " \n" +
    "  void run() { \n" +
    "    display(); \n" +
    "    update(); \n" +
    "  } \n" +
    " \n" +
    "  void display() { \n" +
    "    pushStyle(); \n" +
    "    noStroke(); \n" +
    " \n" +
    "    float hue = 150 + abs(position.x - position.y) % 200; \n" +
    "    fill(hue, 100, 100, t); \n" +
    "    pushMatrix(); \n" +
    "    translate(width/2, height/2); \n" +
    "    translate(sin(s) * cos(s)); \n" +
    "    rotate(s); \n" +
    "    ellipse(position.x, position.y, s, s); \n" +
    "    popMatrix(); \n" +
    "    popStyle(); \n" +
    "  } \n" +
    " \n" +
    "  void update() { \n" +
    "    s-=1; \n" +
    "    t-=2; \n" +
    "  } \n" +
    " \n" +
    "  boolean finished() { \n" +
    "    boolean finished; \n" +
    "    if (s == 0) { \n" +
    "      finished = true; \n" +
    "    } else { \n" +
    "      finished = false; \n" +
    "    } \n" +
    "    return finished; \n" +
    "  } \n" +
    "} \n",
  Example_Particles:
    "ArrayList<Particle> particles; \n" +
    "boolean multitouch = false; \n" +
    "boolean touched = false; \n" +
    "int touchX, touchY; \n" +
    " \n" +
    "void setup() { \n" +
    "  size(screen.width, screen.height); \n" +
    "  colorMode(HSB, 360, 100, 100, 100); \n" +
    "  particles = new ArrayList<Particle>(); \n" +
    "} \n" +
    " \n" +
    "void draw() { \n" +
    "  background(0); \n" +
    " \n" +
    "  for (int i = particles.size ()-1; i >= 0; i--) { \n" +
    "    Particle particle = particles.get(i); \n" +
    "    particle.run(); \n" +
    "    if (particle.finished()) { \n" +
    "      particles.remove(i); \n" +
    "    } \n" +
    "  } \n" +
    "} \n" +
    " \n" +
    "void mouseDragged() { \n" +
    "  mousePressed(); \n" +
    "} \n" +
    " \n" +
    "void mousePressed() { \n" +
    "  if (multitouch == false) { \n" +
    "    particles.add(new Particle(mouseX, mouseY)); \n" +
    "  } \n" +
    "} \n" +
    " \n" +
    "void touchStart(TouchEvent touchEvent) { \n" +
    "  touched = true; \n" +
    "} \n" +
    " \n" +
    "void touchEnd(TouchEvent touchEvent) { \n" +
    "  touched = false; \n" +
    "} \n" +
    " \n" +
    "void touchMove(TouchEvent touchEvent) { \n" +
    "  multitouch = true; \n" +
    "  for (int i = 0; i < touchEvent.touches.length; i++) { \n" +
    "    int x = touchEvent.touches[i].offsetX; \n" +
    "    int y = touchEvent.touches[i].offsetY; \n" +
    " \n" +
    "    touchX = x; \n" +
    "    touchY = y; \n" +
    " \n" +
    "    Particle particle = new Particle(x, y); \n" +
    "    particles.add(particle); \n" +
    "  } \n" +
    "} \n" +
    " \n" +
    "class Particle { \n" +
    "  PVector position = new PVector(); \n" +
    "  float s = 50; \n" +
    "  float t = 100; \n" +
    " \n" +
    "  Particle(int x, int y) { \n" +
    "    position.set(x, y); \n" +
    "  } \n" +
    " \n" +
    "  void run() { \n" +
    "    display(); \n" +
    "    update(); \n" +
    "  } \n" +
    " \n" +
    "  void display() { \n" +
    "    pushStyle(); \n" +
    "    noStroke(); \n" +
    " \n" +
    "    float hueValue = abs(position.x - position.y) % abs(width - height); \n" +
    "    fill(hueValue, 100, 100, t); \n" +
    " \n" +
    "    pushMatrix(); \n" +
    "    rotate(cos(s) * sin(s)); \n" +
    "    ellipse(position.x, position.y, s, s); \n" +
    "    popMatrix(); \n" +
    "    popStyle(); \n" +
    "  } \n" +
    " \n" +
    "  void update() { \n" +
    "    s-=1; \n" +
    "    t-=2; \n" +
    "  } \n" +
    " \n" +
    "  boolean finished() { \n" +
    "    boolean finished; \n" +
    "    if (s == 0) { \n" +
    "      finished = true; \n" +
    "    } else { \n" +
    "      finished = false; \n" +
    "    } \n" +
    "    return finished; \n" +
    "  } \n" +
    "} \n",
  Example_CurlyWorm:
    "ArrayList<Particle> particles; \n" +
    " \n" +
    "void setup() { \n" +
    "  size(screen.width, screen.height, OPENGL); \n" +
    "  mouseX = 200; \n" +
    "  particles = new ArrayList<Particle>(); \n" +
    "  colorMode(HSB, 360, 100, 100, 100); \n" +
    "} \n" +
    " \n" +
    "void draw() { \n" +
    "  background(0); \n" +
    " \n" +
    "  for (int i = particles.size ()-1; i >= 0; i--) { \n" +
    "    Particle particle = particles.get(i); \n" +
    "    particle.run(); \n" +
    "    if (particle.finished()) { \n" +
    "      particles.remove(i); \n" +
    "    } \n" +
    "  } \n" +
    "} \n" +
    " \n" +
    "void mouseDragged() { \n" +
    "  mousePressed(); \n" +
    "} \n" +
    " \n" +
    "void mousePressed() { \n" +
    "  particles.add(new Particle()); \n" +
    "} \n" +
    " \n" +
    "class Particle { \n" +
    " \n" +
    "  PVector pos = new PVector(); \n" +
    "  float s = 50; \n" +
    "  float num; \n" +
    " \n" +
    "  Particle() { \n" +
    "    pos.set(mouseX, mouseY); \n" +
    "    num = 180; \n" +
    "  } \n" +
    " \n" +
    "  void run() { \n" +
    " \n" +
    "    float cx = pos.x; \n" +
    "    float cy = pos.y; \n" +
    "    float r = s; \n" +
    "    float theta = s * 0.5; \n" +
    "    float x = cx + r*sin(theta); \n" +
    "    float y = cy + r*cos(theta); \n" +
    " \n" +
    "    noStroke(); \n" +
    "    fill(num, 100, 100); \n" +
    "    pushMatrix(); \n" +
    "    translate(x, y, s); \n" +
    "    sphere(s); \n" +
    "    popMatrix(); \n" +
    " \n" +
    "    s--; \n" +
    "    num+=2; \n" +
    "  } \n" +
    " \n" +
    "  boolean finished() { \n" +
    "    boolean dead = false; \n" +
    "    if (s < 0) { \n" +
    "      dead = true; \n" +
    "    } else { \n" +
    "      dead = false; \n" +
    "    } \n" +
    "    return dead; \n" +
    "  } \n" +
    "} \n"
}
