interface FloatingButtonProps {
    label: string;
    icon: string;
    onClick: () => void;
  }
  
  export default function FloatingButton({ label, icon, onClick }: FloatingButtonProps) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2000, 
        }}
      >
        <button
          onClick={onClick}
          style={{
            padding: '12px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {icon} {label}
        </button>
      </div>
    );
  }
  