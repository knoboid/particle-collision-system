export function elasticCollision(p1, p2, m1=1, m2=1) {
    const totalMass = m1 + m2;
    const p1Velocity = p1.velocity;

    p1.velocity = newVelocity(p1.position, p1.velocity, p2.position, p2.velocity, m2, totalMass);
    p2.velocity = newVelocity(p2.position, p2.velocity, p1.position, p1Velocity, m1, totalMass);
}

function newVelocity(thisP, thisV, otherP, otherV, otherM, totalM) {
    const massQuotiant = 2 * otherM / totalM;
    const relativePosition = thisP.subtract(otherP);
    const relativeVelocity = thisV.subtract(otherV);
    const productMultiplier = relativeVelocity.dot(relativePosition);
    const lengthSq = relativePosition.lengthSq();
    const velocityMultiplier = massQuotiant * productMultiplier / lengthSq;

    return thisV.subtract(relativePosition.multiply(velocityMultiplier));
}
