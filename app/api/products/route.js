import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category    = searchParams.get('category')
    const brand       = searchParams.get('brand')
    const isNewArrival = searchParams.get('newArrival') === 'true'
    const search      = searchParams.get('q')
    const take        = parseInt(searchParams.get('take') ?? '20')

    const where = {
      isActive: true,
      ...(category    && { category: { slug: category } }),
      ...(brand       && { brand: { slug: brand } }),
      ...(isNewArrival && { isNewArrival: true }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { sku:  { contains: search, mode: 'insensitive' } },
        ],
      }),
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true, brand: true, variants: { take: 1 } },
      orderBy: { createdAt: 'desc' },
      take,
    })

    return NextResponse.json(products)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
