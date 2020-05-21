export const vscode = acquireVsCodeApi();

export function setState(obj: Record<string, any>): void {
    const state = getState();
    Object.assign(state, obj);
    vscode.setState(state);
}

export function getState(): Record<string, any> {
    return vscode.getState() || {};
}

export function scrollToState() {
    const state = getState();
    const xOffset = state.xOffset || 0;
    const yOffset = state.yOffset || 0;
    window.scroll(xOffset, yOffset);
}

export function arrayToMap<T, K extends keyof T>(items: T[], key: K):
    T[K] extends string ? Record<string, T> : T[K] extends number ? Record<number, T> : never {
    const result: Record<string | number, T> = {};
    for (const item of items) {
        const id = item[key];
        if (typeof id !== 'string' && typeof id !== 'number') {
            throw new Error('key of arrayToMap must be a string type');
        }
        result[id] = item;
    }

    return result as any;
}

function navigateText(start: number | undefined, end: number | undefined): void {
    vscode.postMessage({
        command: 'navigate',
        start: start,
        end: end
    });
};

if (window.previewedFileUri) {
    setState({ uri: window.previewedFileUri });
}

window.addEventListener('load', function() {
    // Disable selection
    document.body.style.userSelect = 'none';

    // Save scroll position
    (function() {
        scrollToState();

        window.addEventListener('scroll', function() {
            const state = getState();
            state.xOffset = window.pageXOffset;
            state.yOffset = window.pageYOffset;
            vscode.setState(state);
        });
    })();

    // Drag to scroll
    (function() {
        // Dragger should be like this: <div id="dragger" style="width:100vw;height:100vh;position:fixed;left:0;top:0;"></div>
        const dragger = document.getElementById("dragger");
        if (!dragger) {
            return;
        }

        let mdx = -1;
        let mdy = -1;
        let pressed = false;
        dragger.addEventListener('mousedown', function(e) {
            mdx = e.pageX;
            mdy = e.pageY;
            pressed = true;
        });

        document.body.addEventListener('mousemove', function(e) {
            if (pressed) {
                window.scroll(window.pageXOffset - e.pageX + mdx, window.pageYOffset - e.pageY + mdy);
            }
        });

        document.body.addEventListener('mouseup', function() {
            pressed = false;
        });

        document.body.addEventListener('mouseenter', function(e) {
            if (pressed && (e.buttons & 1) !== 1) {
                pressed = false;
            }
        });
    })();

    // Subscribe navigator
    (function() {
        const navigators = document.getElementsByClassName("navigator");
        for (let i = 0; i < navigators.length; i++) {
            const navigator = navigators[i] as HTMLDivElement;
            navigator.addEventListener('click', function(e) {
                e.stopPropagation();
                const startStr = this.attributes.getNamedItem('start')?.value;
                const endStr = this.attributes.getNamedItem('end')?.value;
                const start = !startStr || startStr === 'undefined' ? undefined : parseInt(startStr);
                const end = !endStr ? undefined : parseInt(endStr);
                navigateText(start, end);
            });
        }
    })();
});