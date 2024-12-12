using back_end.Models;

namespace back_end.SeedData
{
    public class colorData
    {
        public static Color[] ColorSeedData()
        {
            return new Color[]
            {
                new Color{Id= 1 , Name="Xanh Navy"},
                new Color{Id= 2 , Name="Trắng Kem" },
                new Color{Id= 3 , Name="Xanh Rêu" },
                new Color{Id= 4 , Name="Cam"},
                new Color{Id= 5 , Name="Đen"},
                new Color{Id= 6 , Name="Hồng"},
                new Color{Id= 7 , Name="Nâu"},
                new Color{Id= 8 , Name="Xanh Dương"},
                new Color{Id= 9 , Name="Kem"},
                new Color{Id= 10 , Name="Hồng Kem"},
                new Color{Id= 11 , Name="Xanh Lá Cây"},
                new Color{Id= 12 , Name="Xanh Dương"},
                new Color{Id= 13 , Name="Xám"},

            };
        }
    }
}
