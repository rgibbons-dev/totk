import { createSignal, type Component, For } from 'solid-js';

let globalCount = 0;

const [picked, setPicked] = createSignal([]);

function genBoxes(num: number) {
  const boxes = [];
  for(let i = 1; i < num + 1; i++) {
    boxes.push(i);
  }
  return boxes;
}

const App: Component = () => {
  return (
    <div>
      <p class="py-20 text-center text-4xl text-green-700">Hello tailwind!</p>
      <div class="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Holding />
      </div>
      <div class="3xl:grid-cols-7 grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <Boxes />
      </div>
    </div>
  );
};

const Holding: Component = () => {
  const boxes = genBoxes(5);
  return (
    <>
      <For each={boxes} fallback={<div>Loading...</div>}>
      {(item) => 
        <div class="rounded-md bg-black p-4 text-center text-white">{picked()[item-1]}</div>
      }
    </For>
    <button type="submit" class="bg-black text-center text-white" onClick={() => console.log('submit')}>Submit</button>
    </>
  );
};

const Boxes: Component = () => {
  const boxes = genBoxes(20);
  return (
    <For each={boxes} fallback={<div>Loading...</div>}>
      {(item) =>
        <>
          <Box which={item} />
        </>
      }
    </For>
  );
}

type BoxProps = { which: number };

const Box: Component<{which: number}> = (props: BoxProps) => {
  const [count, setCount] = createSignal(0);
  function incr(cur: number) {
    if (count() < 5 && globalCount < 5) {
      setCount(c => c + 1);
      globalCount += 1;
      setPicked(arr => [...arr, cur]);
    }
  }
  function decr(cur: number) {
    if (count() > 0) {
      setCount(c => c - 1);
      globalCount -= 1;
      setPicked(arr => arr.toSpliced(picked().indexOf(cur), 1));
    }
  }
  return (
    <div class="relative rounded-md bg-emerald-500 p-4">
      <div class="absolute bottom-0 left-0 h-4 w-4 rounded-full bg-purple-500">
        <p class="self-center text-center text-xs">{count()}</p>
      </div>
      <button type="button" class="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-red-500" onClick={() => decr(props.which)}>
        <p class="self-center text-center text-xs">-</p>
      </button>
      <button type="button" class="absolute bottom-0 right-4 h-4 w-4 rounded-full bg-blue-500" onClick={() => incr(props.which)}>
        <p class="self-center text-center text-xs">+</p>
      </button>
      {props.which}
    </div>
  );
}

export default App;
