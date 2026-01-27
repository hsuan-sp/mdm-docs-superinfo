"use client"

import { notFound } from 'next/navigation'

/**
 * Catch-all route for /glossary/*
 * This ensures any non-existent paths under /glossary will trigger 404
 */
export default function GlossaryCatchAll() {
  notFound()
}
