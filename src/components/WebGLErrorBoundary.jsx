import { Component } from 'react';

/**
 * Catches WebGL/Three.js context errors so the page doesn't crash.
 * Renders a fallback message when context creation fails (e.g. context limit, GPU block).
 */
export class WebGLErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (typeof this.props.onError === 'function') {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#F7F3EC] text-[#6B6B6B] p-6 text-center"
          style={{ minHeight: 280 }}
        >
          <p className="text-sm font-medium">3D preview unavailable</p>
          <p className="text-xs max-w-xs">
            Your browser couldn’t create a WebGL context. Try refreshing or use another device.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
