import { Camera } from "../lib/webglutils/Camera.js";
import { CanvasAnimation } from "../lib/webglutils/CanvasAnimation.js";
import { MengerSponge } from "./MengerSponge.js";
import { Mat4, Vec3 } from "../lib/TSM.js";

/**
 * Might be useful for designing any animation GUI
 */
interface IGUI {
  viewMatrix(): Mat4;
  projMatrix(): Mat4;
  dragStart(me: MouseEvent): void;
  drag(me: MouseEvent): void;
  dragEnd(me: MouseEvent): void;
  onKeydown(ke: KeyboardEvent): void;
}

/**
 * Handles Mouse and Button events along with
 * the the camera.
 */
export class GUI implements IGUI {
  private static readonly rotationSpeed: number = 0.05;
  private static readonly zoomSpeed: number = 0.1;
  private static readonly rollSpeed: number = 0.1;
  private static readonly panSpeed: number = 0.1;

  private camera: Camera;
  private dragging: boolean;
  private fps: boolean;
  private prevX: number;
  private prevY: number;

  private height: number;
  private width: number;

  private sponge: MengerSponge;
  private animation: CanvasAnimation;

  /**
   *
   * @param canvas required to get the width and height of the canvas
   * @param animation required as a back pointer for some of the controls
   * @param sponge required for some of the controls
   */
  constructor(
    canvas: HTMLCanvasElement,
    animation: CanvasAnimation,
    sponge: MengerSponge
  ) {
    this.height = canvas.height;
    this.width = canvas.width;
    this.prevX = 0;
    this.prevY = 0;

    this.sponge = sponge;
    this.animation = animation;

	this.reset();

    this.registerEventListeners(canvas);
  }

  /**
   * Resets the state of the GUI
   */
  public reset(): void {
    this.fps = false;
    this.dragging = false;
    /* Create camera setup */
    this.camera = new Camera(
      new Vec3([0, 0, -6]),
      new Vec3([0, 0, 0]),
      new Vec3([0, 1, 0]),
      45,
      this.width / this.height,
      0.1,
      1000.0
    );
  }

  /**
   * Sets the GUI's camera to the given camera
   * @param cam a new camera
   */
  public setCamera(
    pos: Vec3,
    target: Vec3,
    upDir: Vec3,
    fov: number,
    aspect: number,
    zNear: number,
    zFar: number
  ) {
    this.camera = new Camera(pos, target, upDir, fov, aspect, zNear, zFar);
  }

  /**
   * Returns the view matrix of the camera
   */
  public viewMatrix(): Mat4 {
    return this.camera.viewMatrix();
  }

  /**
   * Returns the projection matrix of the camera
   */
  public projMatrix(): Mat4 {
    return this.camera.projMatrix();
  }

  /**
   * Callback function for the start of a drag event.
   * @param mouse
   */
  public dragStart(mouse: MouseEvent): void {
    this.dragging = true;
    this.prevX = mouse.screenX;
    this.prevY = mouse.screenY;
  }

  /**
   * The callback function for a drag event.
   * This event happens after dragStart and
   * before dragEnd.
   * @param mouse
   */
  public drag(mouse: MouseEvent): void {
	  
	  // TODO: Your code here for left and right mouse drag
	  
  }

  /**
   * Callback function for the end of a drag event
   * @param mouse
   */
  public dragEnd(mouse: MouseEvent): void {
    this.dragging = false;
    this.prevX = 0;
    this.prevY = 0;
  }

  public saveOBJ(sponge: MengerSponge): void {
    // get vertices, normals, and triangle faces
    const vertices = sponge.positionsFlat();
    const normals = sponge.normalsFlat();
    const faces = sponge.indicesFlat();

    // array to store points in typescript
    const objLines: string[] = [];

    //write vertices, normals, and faces to obj file format

    //vertices format: 'v' x y z
    for (let i = 0; i < vertices.length; i += 3) {
      objLines.push(`v ${vertices[i]} ${vertices[i + 1]} ${vertices[i + 2]}`)
    }

    //normals format: 'vn' x y z
    for (let i = 0; i < normals.length; i += 3) {
      objLines.push(`vn ${normals[i]} ${normals[i + 1]} ${normals[i + 2]}`)
    }

    //triangle faces format: 'f' vertex1//vertex1 normal vertex2//vertex2 normal vertex3//vertex3 normal
    for (let i = 0; i < faces.length; i += 3) {
      //reading in sets of 3 for trianges (hence v1=i, v2=i+1, v3=i+2)
      //obj format is 1-based so have to +1 to all faces to get the right indexing
      const v1 = faces[i] + 1;
      const v2 = faces[i + 1] + 1;
      const v3 = faces[i + 2] + 1;

      objLines.push(`f ${v1}//${v1} ${v2}//${v2} ${v3}//${v3}`);
    }

    //create a blob for temporarily holding objLines in obj format
    const blob = new Blob([objLines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const currSponge = document.createElement("a");
    currSponge.href = url;
    currSponge.download = "MengerSponge.obj";

    //remove temporary blob after downloaded
    URL.revokeObjectURL(url);

  }
  

  /**
   * Callback function for a key press event
   * @param key
   */
  public onKeydown(key: KeyboardEvent): void {
    /*
       Note: key.code uses key positions, i.e a QWERTY user uses y where
             as a Dvorak user must press F for the same action.
       Note: arrow keys are only registered on a KeyDown event not a
       KeyPress event
       We can use KeyDown due to auto repeating.
     */

	// TOOD: Your code for key handling

    if(key.ctrlKey && key.key == "s") {
      this.saveOBJ(this.sponge);
      return;
    }

    switch (key.code) {
      case "KeyW": {

        break;
      }
      case "KeyA": {

        break;
      }
      case "KeyS": {

        break;
      }
      case "KeyD": {

        break;
      }
      case "KeyR": {

        break;
      }
      case "ArrowLeft": {

        break;
      }
      case "ArrowRight": {

        break;
      }
      case "ArrowUp": {

        break;
      }
      case "ArrowDown": {

        break;
      }
      case "Digit1": {

        break;
      }
      case "Digit2": {

        break;
      }
      case "Digit3": {

        break;
      }
      case "Digit4": {

        break;
      }
      default: {
        console.log("Key : '", key.code, "' was pressed.");
        break;
      }
    }
  }

  /**
   * Registers all event listeners for the GUI
   * @param canvas The canvas being used
   */
  private registerEventListeners(canvas: HTMLCanvasElement): void {
    /* Event listener for key controls */
    window.addEventListener("keydown", (key: KeyboardEvent) =>
      this.onKeydown(key)
    );

    /* Event listener for mouse controls */
    canvas.addEventListener("mousedown", (mouse: MouseEvent) =>
      this.dragStart(mouse)
    );

    canvas.addEventListener("mousemove", (mouse: MouseEvent) =>
      this.drag(mouse)
    );

    canvas.addEventListener("mouseup", (mouse: MouseEvent) =>
      this.dragEnd(mouse)
    );



    /* Event listener to stop the right click menu */
    canvas.addEventListener("contextmenu", (event: any) =>
      event.preventDefault()
    );
  }
}
