const Logos: React.FC = () => {
    return (
        <section id="logos" className="py-32 px-5 bg-background">
            <p className="text-xl font-medium text-center">
                Loved by busy parents, home cooks, and food lovers alike
            </p>
            <div className="mt-5 flex flex-wrap justify-evenly items-center gap-6 text-center text-muted-foreground text-base">
                <div>
                    🍳 Home Cooks<br />
                    &ldquo;Makes weeknights so much easier!&rdquo;
                </div>
                <div>
                    👩‍👧‍👦 Busy Parents<br />
                    &ldquo;No more last-minute panic meals.&rdquo;
                </div>
                <div>
                    🥗 Healthy Eaters<br />
                    &ldquo;Great way to plan clean meals ahead.&rdquo;
                </div>
                <div>
                    💻 Meal Preppers<br />
                    &ldquo;My Sunday routine, sorted.&rdquo;
                </div>
            </div>
        </section>
    )
}

export default Logos