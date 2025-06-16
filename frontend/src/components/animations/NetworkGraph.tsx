import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

interface Node {
  x: number;
  y: number;
  radius: number;
  speed: number;
  angle: number;
}

interface Connection {
  start: Node;
  end: Node;
  active: boolean;
}

const NetworkGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置canvas尺寸
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // 创建节点
    const nodes: Node[] = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 2 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.3,
      angle: Math.random() * Math.PI * 2,
    }));

    // 创建连接
    const connections: Connection[] = [];
    nodes.forEach((node, i) => {
      nodes.slice(i + 1).forEach(otherNode => {
        if (Math.random() > 0.5) {
          connections.push({
            start: node,
            end: otherNode,
            active: false,
          });
        }
      });
    });

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 更新节点位置
      nodes.forEach(node => {
        node.x += Math.cos(node.angle) * node.speed;
        node.y += Math.sin(node.angle) * node.speed;

        // 边界检查
        if (node.x < 0 || node.x > canvas.width) node.angle = Math.PI - node.angle;
        if (node.y < 0 || node.y > canvas.height) node.angle = -node.angle;

        // 绘制节点
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#165DFF';
        ctx.fill();
      });

      // 绘制连接
      connections.forEach(connection => {
        const dx = connection.end.x - connection.start.x;
        const dy = connection.end.y - connection.start.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          connection.active = true;
          const opacity = 1 - distance / 150;
          ctx.beginPath();
          ctx.moveTo(connection.start.x, connection.start.y);
          ctx.lineTo(connection.end.x, connection.end.y);
          ctx.strokeStyle = `rgba(22, 93, 255, ${opacity * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          connection.active = false;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="0"
      opacity="0.6"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default NetworkGraph; 