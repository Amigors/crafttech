const Toolbar = ({ onShapeSelect, onToolSelect }: { onShapeSelect: (shape: string) => void, onToolSelect: (tool: string) => void }) => {
    return (
        <div style={{ position: 'absolute', zIndex: 1, top: 0, left: 0, padding: '10px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <div>
                <label>Shape:</label>
                <select onChange={(e) => onShapeSelect(e.target.value)}>
                    <option value="">Select</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="circle">Circle</option>
                    <option value="line">Line</option>
                </select>
            </div>
            <div style={{ marginTop: '10px' }}>
                <label>Tool:</label>
                <button onClick={() => onToolSelect('select')}>Select</button>
                <button onClick={() => onToolSelect('Add')}>Add</button>
            </div>
        </div>
    );
};

export default Toolbar;