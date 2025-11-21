"use client";
 
 import Link from "next/link";
 import Image from "next/image";
 import { useEffect, useMemo, useState } from "react";
 import { Badge } from "@/components/ui/badge";
 
 import { AddToCartButton } from "@/components/cart/add-to-cart-button";
 import { formatCurrency } from "@/lib/formatters";
 import { CommerceProduct } from "@/lib/data";
 
 type Props = {
   product: CommerceProduct;
 };
 
 export function ProductCard({ product }: Props) {
   const images = useMemo(() => {
     const list = [product.image, ...(product.gallery ?? [])].filter(Boolean) as string[];
     return list.length ? list : [];
   }, [product.image, product.gallery]);
 
   const [index, setIndex] = useState(0);
 
   useEffect(() => {
     if (images.length <= 1) return;
     const interval = setInterval(() => {
       setIndex((prev) => (prev + 1) % images.length);
     }, 3500);
     return () => clearInterval(interval);
   }, [images]);
 
   const currentImage = images[index] ?? null;
 
   return (
     <div className="group flex h-full flex-col rounded-[32px] border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
       <div className="relative aspect-[4/3] overflow-hidden rounded-t-[32px]">
         {currentImage ? (
           <Image
             key={currentImage}
             src={currentImage}
             alt={product.name}
             fill
             sizes="(min-width: 1024px) 360px, 100vw"
             className="object-cover transition duration-700 group-hover:scale-[1.02]"
             priority={product.isFeatured}
           />
         ) : (
           <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
             Sem imagem
           </div>
         )}
         {product.isFeatured && (
           <Badge className="absolute left-4 top-4 bg-black text-white">Destaque</Badge>
         )}
         {images.length > 1 && (
           <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
             {images.map((_, dotIndex) => (
               <span
                 key={`dot-${product.id}-${dotIndex}`}
                 className={`h-1.5 w-6 rounded-full ${
                   dotIndex === index ? "bg-white" : "bg-white/40"
                 }`}
               />
             ))}
           </div>
         )}
       </div>
       <div className="flex flex-1 flex-col rounded-b-[32px] border-t bg-white p-4">
         <div className="flex items-center justify-between text-xs text-muted-foreground">
           <span>{product.category?.name}</span>
           <span>Estoque: {product.stock}</span>
         </div>
         <Link href={`/products/${product.slug}`}>
           <h3 className="mt-2 text-lg font-semibold text-zinc-900 lg:text-xl">{product.name}</h3>
           <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
         </Link>
         <div className="mt-4 flex flex-col gap-1">
           <div className="text-xl font-semibold text-zinc-900">
             {formatCurrency(product.price)}
           </div>
           {product.compareAtPrice && (
             <p className="text-xs text-muted-foreground line-through">
               {formatCurrency(product.compareAtPrice)}
             </p>
           )}
         </div>
         <div className="mt-4">
           <AddToCartButton product={product} />
         </div>
       </div>
     </div>
   );
 }
