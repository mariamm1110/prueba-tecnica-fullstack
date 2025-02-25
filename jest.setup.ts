import { JSDOM } from "jsdom";

// Create a new JSDOM instance
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`, {
  url: "http://localhost/",
});

// Assign window and document to the global object
global.window = dom.window as unknown as Window & typeof globalThis;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Fix some missing properties in the test environment
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
global.XMLHttpRequest = dom.window.XMLHttpRequest;

