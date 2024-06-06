import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

const Canvas = ({ addShape, selectedTool }: { addShape: string, selectedTool: string }) => {
    console.log(selectedTool)
    const [shapes, setShapes] = useState<any[]>([]);
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
    const stageRef = useRef<any>(null);

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        if (addShape) {
            const stage = stageRef.current;
            const point = stage.getPointerPosition();

            let newShape;
            switch (addShape) {
                case 'rectangle':
                    newShape = { id: shapes.length, type: 'rect', x: point.x, y: point.y, width: 100, height: 50, fill: 'blue' };
                    break;
                case 'circle':
                    newShape = { id: shapes.length, type: 'circle', x: point.x, y: point.y, radius: 50, fill: 'red' };
                    break;
                case 'line':
                    newShape = { id: shapes.length, type: 'line', points: [point.x, point.y, point.x + 100, point.y], stroke: 'green', strokeWidth: 5 };
                    break;
                default:
                    return;
            }

            setShapes([...shapes, newShape]);
        }
    };

    useEffect(() => {
        const stage = stageRef.current;
        const container = stage.container();

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            const scaleBy = 1.05;
            const oldScale = stage.scaleX();

            const mousePointTo = {
                x: stage.getPointerPosition()?.x / oldScale - stage.x() / oldScale,
                y: stage.getPointerPosition()?.y / oldScale - stage.y() / oldScale,
            };

            const newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            stage.scale({ x: newScale, y: newScale });

            const newPos = {
                x: -(mousePointTo.x - stage.getPointerPosition()?.x / newScale) * newScale,
                y: -(mousePointTo.y - stage.getPointerPosition()?.y / newScale) * newScale,
            };
            stage.position(newPos);
            stage.batchDraw();
        };

        container.addEventListener('wheel', handleWheel);
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            draggable
            onMouseDown={handleMouseDown}
            ref={stageRef}
            x={stagePos.x}
            y={stagePos.y}
            onDragEnd={(e) => setStagePos({ x: e.target.x(), y: e.target.y() })}
        >
            <Layer>
                {shapes.map((shape) => {
                    switch (shape.type) {
                        case 'rect':
                            return <Rect key={shape.id} {...shape} draggable={selectedTool === 'select'} />;
                        case 'circle':
                            return <Circle key={shape.id} {...shape} draggable={selectedTool === 'select'} />;
                        case 'line':
                            return <Line key={shape.id} {...shape} draggable={selectedTool === 'select'} />;
                        default:
                            return null;
                    }
                })}
            </Layer>
        </Stage>
    );
};

export default Canvas;